import { loadEnv } from 'vite';
import { createContactServer } from './app.mjs';
import { createEmailSender } from './email.mjs';

// Mount the API on Vite itself so every local entry point supports the forms.
export function contactApiPlugin() {
  let config;
  function configure(server) {
    const environment = () => ({ ...loadEnv(config.mode, config.envDir, ''), ...process.env });
    const env = environment();
    const api = createContactServer(env.DATABASE_PATH, createEmailSender(env));
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0] !== '/api/contact') return next();
      api.emit('request', req, res);
    });
    const reload = path => {
      if (/(^|[/\\])\.env(?:\..*)?$/.test(path)) {
        api.configureEmail(createEmailSender(environment()));
      }
    };
    server.watcher?.on('change', reload);
    server.httpServer?.once('close', () => {
      server.watcher?.off('change', reload);
      api.close();
    });
    api.configureEmail(createEmailSender(env));
  }
  return {
    name: 'oxford-contact-api',
    configResolved(resolved) { config = resolved; },
    configureServer: configure,
    configurePreviewServer: configure,
  };
}
