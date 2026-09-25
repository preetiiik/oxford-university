import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createContactServer } from './app.mjs';
import { createEmailSender } from './email.mjs';

function enquiry(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: 'Test Student', email: 'student@example.test', phone: '+91 9876543210', course: 'BBA', message: 'Please send course details.', ...overrides })) data.set(key, value);
  return data;
}
async function fixture(t, sender = null) {
  const directory = mkdtempSync(join(tmpdir(), 'oxford-contact-'));
  const path = join(directory, 'test.sqlite');
  const server = createContactServer(path, sender);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    unlinkSync(path); rmdirSync(directory);
  });
  const read = query => { const db = new DatabaseSync(path); try { return db.prepare(query).all(); } finally { db.close(); } };
  return { base, path, read, post: data => fetch(`${base}/api/contact`, { method: 'POST', body: data }) };
}

test('saves an enquiry and durable notification queue without exposing submissions', async t => {
  const f = await fixture(t);
  const response = await f.post(enquiry());
  assert.equal(response.status, 201);
  assert.ok((await response.json()).id);
  assert.equal(f.read('SELECT * FROM enquiries')[0].email, 'student@example.test');
  assert.equal(f.read('SELECT * FROM email_queue')[0].sent_at, null);
  assert.equal((await fetch(`${f.base}/api/contact`)).status, 405);
  assert.equal((await fetch(`${f.base}/data/enquiries.sqlite`)).status, 404);
});

test('rejects invalid input without storing it', async t => {
  const f = await fixture(t);
  for (const invalid of [{ name: '' }, { email: 'invalid' }, { phone: 'abc' }, { course: 'Unknown' }, { message: 'x'.repeat(5001) }, { dateOfBirth: '2025-02-30' }, { dateOfBirth: '2999-01-01' }]) {
    assert.equal((await f.post(enquiry(invalid))).status, 400);
  }
  assert.equal(f.read('SELECT * FROM enquiries').length, 0);
});

test('saves a valid admission document and rejects fake or oversized files', async t => {
  const f = await fixture(t);
  const valid = enquiry({ dateOfBirth: '2005-05-17' });
  valid.set('document', new Blob(['%PDF-1.4\nTest document'], { type: 'application/pdf' }), 'marks.pdf');
  assert.equal((await f.post(valid)).status, 201);
  const saved = f.read('SELECT * FROM enquiries')[0];
  assert.equal(saved.document_name, 'marks.pdf');
  assert.equal(Buffer.from(saved.document).toString(), '%PDF-1.4\nTest document');
  const fake = enquiry();
  fake.set('document', new Blob(['not a PDF'], { type: 'application/pdf' }), 'fake.pdf');
  assert.equal((await f.post(fake)).status, 400);
  const large = enquiry();
  large.set('document', new Blob([new Uint8Array(5 * 1024 * 1024 + 1)], { type: 'image/png' }), 'large.png');
  assert.equal((await f.post(large)).status, 413);
  assert.equal(f.read('SELECT * FROM enquiries').length, 1);
});

test('email success marks the queue sent; failures retain the enquiry for retry', async t => {
  const messages = [];
  const f = await fixture(t, async entry => { messages.push(entry); if (entry.course === 'MBA') throw new Error('Provider unavailable'); });
  assert.equal((await f.post(enquiry())).status, 201);
  assert.ok(f.read('SELECT * FROM email_queue')[0].sent_at);
  assert.equal(messages[0].email, 'student@example.test');
  assert.equal((await f.post(enquiry({ course: 'MBA' }))).status, 201);
  const failed = f.read('SELECT * FROM email_queue WHERE sent_at IS NULL')[0];
  assert.equal(failed.attempts, 1);
  assert.ok(failed.next_attempt > Date.now());
  assert.equal(f.read('SELECT * FROM enquiries').length, 2);
});

test('malformed requests and excessive attempts are rejected', async t => {
  const f = await fixture(t);
  assert.equal((await fetch(`${f.base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' })).status, 415);
  assert.equal((await fetch(`${f.base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'multipart/form-data; boundary=bad' }, body: 'invalid' })).status, 400);
  for (let i = 0; i < 8; i++) await f.post(enquiry({ name: '' }));
  assert.equal((await f.post(enquiry())).status, 429);
});

test('Gmail adapter uses TLS, app password, recipient and reply-to', async () => {
  assert.equal(createEmailSender({}), null);
  let options, message;
  const sender = createEmailSender({ GMAIL_USER: 'sender@gmail.com', GMAIL_APP_PASSWORD: 'abcd efgh ijkl mnop', CONTACT_EMAIL_TO: 'office@example.test' }, config => {
    options = config;
    return { sendMail: async mail => { message = mail; return { accepted: ['office@example.test'], rejected: [] }; } };
  });
  await sender({ id: 'test-id', name: 'Student', email: 'student@example.test', phone: '1234567890', course: 'BCA', message: 'Hello' });
  assert.equal(options.host, 'smtp.gmail.com');
  assert.equal(options.port, 465);
  assert.equal(options.secure, true);
  assert.deepEqual(options.auth, { user: 'sender@gmail.com', pass: 'abcdefghijklmnop' });
  assert.equal(message.to, 'office@example.test');
  assert.equal(message.from.address, 'sender@gmail.com');
  assert.equal(message.replyTo, 'student@example.test');
  assert.equal(message.messageId, '<enquiry-test-id@gmail.com>');
});

test('Gmail failures propagate to the retry queue', async () => {
  const env = { GMAIL_USER: 'sender@gmail.com', GMAIL_APP_PASSWORD: 'test-password', CONTACT_EMAIL_TO: 'office@example.test' };
  const entry = { id: 'test', email: 'student@example.test', course: 'BCA' };
  const rejected = createEmailSender(env, () => ({ sendMail: async () => ({ accepted: [], rejected: ['office@example.test'] }) }));
  await assert.rejects(rejected(entry), /did not accept/);
  const failed = createEmailSender(env, () => ({ sendMail: async () => { throw new Error('Authentication failed'); } }));
  await assert.rejects(failed(entry), /Authentication failed/);
});
test('JSON submissions and CORS support localhost and Netlify, including error responses', async t => {
  const f = await fixture(t);
  for (const origin of ['http://localhost:5173', 'https://oxforduniversityhubli.netlify.app']) {
    const preflight = await fetch(`${f.base}/api/contact`, { method: 'OPTIONS', headers: { Origin: origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
    assert.match(preflight.headers.get('access-control-allow-methods'), /POST/);
    assert.match(preflight.headers.get('access-control-allow-headers'), /Content-Type/i);
    const response = await fetch(`${f.base}/api/contact`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(enquiry())) });
    assert.equal(response.status, 201);
    assert.ok((await response.json()).id);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
    const invalid = await fetch(`${f.base}/api/contact`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: '{}' });
    assert.equal(invalid.status, 400);
    assert.equal(invalid.headers.get('access-control-allow-origin'), origin);
  }
  const blocked = await fetch(`${f.base}/api/contact`, { method: 'OPTIONS', headers: { Origin: 'https://untrusted.example' } });
  assert.equal(blocked.status, 403);
  assert.equal(blocked.headers.get('access-control-allow-origin'), null);
  for (const body of ['{', 'null', '[]', '{"name":123}']) {
    assert.equal((await fetch(`${f.base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })).status, 400);
  }
  assert.equal(f.read('SELECT * FROM enquiries').length, 2);
});
