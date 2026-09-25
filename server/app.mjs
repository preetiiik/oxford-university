import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createEmailSender } from './email.mjs';

export function createContactServer(databasePath = resolve('data/enquiries.sqlite'), sendEmail = createEmailSender()) {
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL,
    email TEXT NOT NULL, phone TEXT NOT NULL, course TEXT NOT NULL,
    message TEXT NOT NULL, date_of_birth TEXT NOT NULL,
    document_name TEXT, document_type TEXT, document BLOB
  )`);
  db.exec(`CREATE TABLE IF NOT EXISTS email_queue (
    enquiry_id TEXT PRIMARY KEY, attempts INTEGER NOT NULL DEFAULT 0,
    next_attempt INTEGER NOT NULL DEFAULT 0, sent_at TEXT
  )`);
  let delivering = false;
  let closing = false;
  async function deliverPending() {
    if (!sendEmail || delivering || closing) return;
    delivering = true;
    try {
      const pending = db.prepare('SELECT e.*, q.attempts FROM email_queue q JOIN enquiries e ON e.id = q.enquiry_id WHERE q.sent_at IS NULL AND q.attempts < 8 AND q.next_attempt <= ? LIMIT 10').all(Date.now());
      for (const entry of pending) {
        if (closing) break;
        try {
          await sendEmail(entry);
          db.prepare('UPDATE email_queue SET sent_at = ? WHERE enquiry_id = ?').run(new Date().toISOString(), entry.id);
        } catch {
          db.prepare('UPDATE email_queue SET attempts = attempts + 1, next_attempt = ? WHERE enquiry_id = ?').run(Date.now() + 60000 * 2 ** entry.attempts, entry.id);
          console.warn('An enquiry email is pending; check provider configuration.');
        }
      }
    } finally { delivering = false; if (closing) db.close(); }
  }
  const deliveryTimer = setInterval(deliverPending, 30000);
  deliveryTimer.unref();
  const insert = db.prepare('INSERT INTO enquiries VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const attempts = new Map();
  const courses = ['BBA', 'BCA', 'B.Com', 'PUC Science', 'PUC Commerce', 'M.Com', 'MBA', 'MCA'];
  const allowedOrigins = new Set(['http://localhost:5173', 'https://oxforduniversityhubli.netlify.app']);
  const server = createServer(async (req, res) => {
    const origin = req.headers.origin;
    res.setHeader('Vary', 'Origin');
    if (allowedOrigins.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    const reply = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      res.end(JSON.stringify(body));
    };
    if (req.url !== '/api/contact') return reply(404, { error: 'Not found.' });
    const sameOrigin = origin === `http://${req.headers.host}` || origin === `https://${req.headers.host}`;
    if (origin && !allowedOrigins.has(origin) && !sameOrigin) return reply(403, { error: 'Origin not allowed.' });
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }
    if (req.method !== 'POST') return reply(405, { error: 'Use POST to submit an enquiry.' });
    const now = Date.now();
    for (const [ip, value] of attempts) if (now > value.until) attempts.delete(ip);
    const ip = req.socket.remoteAddress;
    const bucket = attempts.get(ip) ?? { count: 0, until: now + 60000 };
    attempts.set(ip, bucket);
    if (++bucket.count > 10) return reply(429, { error: 'Too many attempts. Please wait a minute and try again.' });
    const isJson = req.headers['content-type']?.split(';')[0].trim().toLowerCase() === 'application/json';
    if (!isJson && !req.headers['content-type']?.startsWith('multipart/form-data;')) return reply(415, { error: 'Submit form data.' });
    try {
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 6 * 1024 * 1024) { reply(413, { error: 'Submission is too large. Documents must be under 5 MB.' }); return; }
        chunks.push(chunk);
      }
      let form;
      try {
        if (isJson) {
          const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Invalid JSON object');
          form = new FormData();
          for (const [key, value] of Object.entries(payload)) {
            if (typeof value !== 'string') throw new Error('Fields must be strings');
            form.set(key, value);
          }
        } else form = await new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': req.headers['content-type'] }, body: Buffer.concat(chunks) }).formData();
      } catch { return reply(400, { error: 'Invalid form data.' }); }
      const field = (name) => typeof form.get(name) === 'string' ? form.get(name).trim() : '';
      const name = field('name'), email = field('email'), phone = field('phone'), course = field('course'), message = field('message'), dob = field('dateOfBirth');
      if (name.length < 2 || name.length > 120) return reply(400, { error: 'Enter a name between 2 and 120 characters.' });
      if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { error: 'Enter a valid email address.' });
      if (!/^[+\d\s().-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7) return reply(400, { error: 'Enter a valid phone number.' });
      if (!courses.includes(course)) return reply(400, { error: 'Select a valid course.' });
      if (message.length > 5000) return reply(400, { error: 'Keep your message under 5,000 characters.' });
      if (dob && (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || !Number.isFinite(Date.parse(dob)) || new Date(dob).toISOString().slice(0, 10) !== dob || dob > new Date().toISOString().slice(0, 10))) return reply(400, { error: 'Enter a valid date of birth.' });
      const file = form.get('document');
      let document = null, documentName = null, documentType = null;
      if (file && typeof file !== 'string' && file.size) {
        if (file.size > 5 * 1024 * 1024) return reply(413, { error: 'Documents must be under 5 MB.' });
        document = Buffer.from(await file.arrayBuffer());
        const signatures = {
          'application/pdf': document.subarray(0, 5).toString() === '%PDF-',
          'image/png': document.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
          'image/jpeg': document[0] === 255 && document[1] === 216 && document[2] === 255,
        };
        if (!signatures[file.type]) return reply(400, { error: 'Upload a PDF, PNG or JPEG document.' });
        documentName = file.name.slice(0, 255);
        documentType = file.type;
      }
      const id = randomUUID();
      db.exec('BEGIN');
      try {
        insert.run(id, new Date().toISOString(), name, email, phone, course, message, dob, documentName, documentType, document);
        db.prepare('INSERT INTO email_queue (enquiry_id) VALUES (?)').run(id);
        db.exec('COMMIT');
      } catch (error) { db.exec('ROLLBACK'); throw error; }
      void deliverPending();
      return reply(201, { id, message: 'Your enquiry has been received.' });
    } catch (error) {
      console.error('Contact submission failed:', error.message);
      if (!res.headersSent) reply(500, { error: 'Unable to save your enquiry. Please try again.' });
    }
  });
  server.requestTimeout = 30000;
  server.configureEmail = sender => { sendEmail = sender; void deliverPending(); };
  server.on('listening', () => { void deliverPending(); });
  server.on('close', () => { closing = true; clearInterval(deliveryTimer); if (!delivering) db.close(); });
  return server;
}
