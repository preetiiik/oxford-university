import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { createContactServer } from './app.mjs';

test('shared frontend client sends JSON and document uploads to the configured backend', async () => {
  const server = createContactServer(':memory:', null);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const source = readFileSync('src/api.ts', 'utf8').replace('import.meta.env.VITE_API_URL', JSON.stringify(base + '/'));
    const outputText = stripTypeScriptTypes(source);
    const { API_URL, submitEnquiry } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
    assert.equal(API_URL, base);
    for (const withFile of [false, true]) {
      const data = new FormData();
      for (const [key, value] of Object.entries({ name: 'Test Student', email: 'student@example.test', phone: '9876543210', course: 'PUC Commerce', dateOfBirth: '2005-05-17' })) data.set(key, value);
      if (withFile) data.set('document', new File(['%PDF-1.4\nTest'], 'marks.pdf', { type: 'application/pdf' }));
      const response = await submitEnquiry(data);
      assert.equal(response.status, 201);
      assert.ok((await response.json()).id);
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});
