import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, preview } from 'vite';
import { contactApiPlugin } from './vite-contact.mjs';

for (const mode of ['development', 'preview']) {
  test(`${mode} serves both form submissions without a separate API process`, async () => {
    const previous = { ...process.env };
    process.env.DATABASE_PATH = ':memory:';
    process.env.GMAIL_USER = '';
    process.env.GMAIL_APP_PASSWORD = '';
    process.env.CONTACT_EMAIL_TO = '';
    let server;
    try {
      const config = { configFile: false, plugins: [contactApiPlugin()], server: { host: '127.0.0.1', port: 0 }, preview: { host: '127.0.0.1', port: 0 } };
      server = mode === 'preview' ? await preview(config) : await createServer(config);
      if (mode === 'development') await server.listen();
      const port = server.httpServer.address().port;
      for (const admissions of [false, true]) {
        const data = new FormData();
        for (const [key, value] of Object.entries({ name: 'Test Student', email: 'student@example.test', phone: '9876543210', course: 'PUC Commerce', ...(admissions ? { dateOfBirth: '2005-05-17' } : { message: 'Test enquiry' }) })) data.set(key, value);
        if (admissions) data.set('document', new Blob(['%PDF-1.4\nTest'], { type: 'application/pdf' }), 'test.pdf');
        const response = await fetch(`http://127.0.0.1:${port}/api/contact`, { method: 'POST', body: data });
        assert.equal(response.status, 201);
        assert.ok((await response.json()).id);
      }
    } finally {
      if (server) {
        if (mode === 'development') await server.close();
        else await new Promise(resolve => server.httpServer.close(resolve));
      }
      for (const key of ['DATABASE_PATH', 'GMAIL_USER', 'GMAIL_APP_PASSWORD', 'CONTACT_EMAIL_TO']) {
        if (previous[key] === undefined) delete process.env[key];
        else process.env[key] = previous[key];
      }
    }
  });
}
