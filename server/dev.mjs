import { createServer } from 'vite';
import { createContactServer } from './app.mjs';
import { createEmailSender } from './email.mjs';
import { readFileSync, watchFile, unwatchFile } from 'node:fs';
import { parseEnv } from 'node:util';

const api = createContactServer(process.env.DATABASE_PATH);
api.on('error', error => { console.error(error.message); process.exit(1); });
await new Promise(resolve => api.listen(3001, '127.0.0.1', resolve));
const vite = await createServer();
await vite.listen();
vite.printUrls();
watchFile('.env', { interval: 1000 }, () => {
  try {
    api.configureEmail(createEmailSender({ ...process.env, ...parseEnv(readFileSync('.env', 'utf8')) }));
    console.log('Email configuration reloaded.');
  } catch { console.warn('Could not reload email configuration. Check .env.'); }
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { unwatchFile('.env'); await vite.close(); api.close(); });
