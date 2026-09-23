import { createContactServer } from './app.mjs';
const port = Number(process.env.PORT || 3001);
const server = createContactServer(process.env.DATABASE_PATH);
server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Contact API listening on port ${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
