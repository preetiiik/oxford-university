import { createServer } from 'vite';
const vite = await createServer();
await vite.listen();
vite.printUrls();
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await vite.close(); });
