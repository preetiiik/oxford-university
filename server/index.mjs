import { createContactServer } from './app.mjs';
const port = Number(process.env.PORT || 3001);
const server = createContactServer(process.env.DATABASE_PATH);
server.listen(port, process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'), () => console.log(`Contact API listening on port ${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
