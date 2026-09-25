# Contact and admissions backend

Requires Node 24.12+ (or Node 26). Uses Node's built-in SQLite database with Nodemailer for Gmail SMTP notifications.

## Local development

1. Copy `.env.example` to `.env` and enter your email settings.
2. Run `npm.cmd run dev` on Windows (`npm run dev` elsewhere). Vite serves both the website and the API on the same port. Direct `vite` and `npm run preview` also include the API automatically.
3. Submit Apply Now or Admissions. Successful submissions are saved to `data/enquiries.sqlite` before success is shown.

Email uses Gmail SMTP over TLS (port 465): set `GMAIL_USER` (your full Gmail address), `GMAIL_APP_PASSWORD` (a Google App Password) and `CONTACT_EMAIL_TO` (the admissions recipient). Enable 2-Step Verification and create an app password using [Google instructions](https://support.google.com/mail/answer/185833). Spaces in the app password are removed automatically. Restart the backend after changing `.env`. No credentials belong in frontend code or `VITE_` variables. Without email configuration, submissions remain stored and their notifications stay queued. After configuration and restart, pending notifications are sent.

The queue retries failed notifications up to eight times with increasing delays. Inspect `email_queue` for unsent entries; after correcting a persistent provider error, an operator can reset `attempts` and `next_attempt` to zero to retry. Notifications include submitted text and the attachment filename; uploaded documents stay in the private database and are not emailed.

## Production

Run `npm run build`; serve `dist` through your web server and proxy `/api/contact` to `npm run server` on port 3001. Use HTTPS and persistent storage for `DATABASE_PATH`, with restricted filesystem access and backups. Static-only hosting cannot run this backend. `npm run preview` includes the API for local build checks; no separate server command is needed for preview.

`POST /api/contact` accepts a JSON object for text-only submissions, or multipart form fields `name`, `email`, `phone`, `course`, optional `message`, `dateOfBirth` and `document`. PDFs, PNGs and JPEGs up to 5 MB are accepted. Input validation, request size limits and a basic per-connection-IP limit are enforced. Configure per-client rate limiting at your reverse proxy in production; the application deliberately does not trust forwarded IP headers.

There is no public submissions endpoint. An operator can inspect the local SQLite `enquiries` and `email_queue` tables using a database client. Never serve the `data` directory publicly.

## Verification

`npm test` runs isolated backend tests with temporary databases and mocked email delivery. It does not send real email. `npm run build` checks TypeScript and builds the frontend.

SMTP retries use a stable Message-ID, but SMTP cannot guarantee exactly-once delivery after an ambiguous connection failure; a retry may produce a duplicate notification.

## Netlify frontend with a separate backend

The repository contains the backend implementation but no deployed backend URL. Netlify publishes `dist`; it does not run `server/index.mjs` or the Vite development plugin. The frontend and backend must both be deployed.

1. Deploy this repository as a persistent Node web service (Node 26), on your Node host or VPS. Install with `npm ci`; start with `npm run server`. Set `NODE_ENV=production` and `HOST=0.0.0.0`; use the host-provided `PORT`. Configure an HTTPS public origin for the service.
2. Mount a persistent writable disk and set `DATABASE_PATH` to an absolute SQLite file path on it. Keep a single service instance with this SQLite setup. The database contains enquiries, uploaded files, and the email retry queue; ephemeral function storage is unsuitable for this backend.
3. Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `CONTACT_EMAIL_TO` on the backend if email notifications are required. These are server-only secrets, never `VITE_` variables.
4. In Netlify project environment variables, set `VITE_API_URL` to the actual HTTPS backend origin (no `/api/contact` suffix). Make it available to Builds for the production context. Do not set it to this Netlify site's URL or localhost. No real value can be provided until the backend is deployed or its existing URL is supplied.
5. Deploy the code and trigger a fresh Netlify build. `netlify.toml` sets `npm run build`, `dist`, and Node 26. Vite embeds `VITE_API_URL` at build time; changing the variable requires rebuilding. Netlify builds deliberately fail if this URL is missing or incorrectly formatted. There is no rewrite pretending the static site has a backend.

The shared frontend client is `src/api.ts`, called by `useContactForm` for both Apply Now and Admissions. Text-only requests use JSON. Document uploads use multipart FormData with the browser-generated boundary. The API validates and saves both formats before returning HTTP 201 with an `id`. Existing UI messages are unchanged.

CORS permits `http://localhost:5173` and `https://oxforduniversityhubli.netlify.app`, with OPTIONS preflight, POST, and Content-Type. Same-origin requests remain supported for local Vite/preview. Other cross-origin sites (including deploy-preview domains) need an explicit backend allowlist change.

### Verify after deployment

- Open the backend's `/api/contact` URL: GET should return JSON with HTTP 405, which confirms the route exists. A 404 or HTML response indicates an incorrect backend URL or routing configuration.
- In Chrome on the Netlify site, open Network and submit each form with test details. Verify the Request URL is the backend origin plus `/api/contact`, not the Netlify origin.
- For JSON requests, OPTIONS should return 204 with `Access-Control-Allow-Origin: https://oxforduniversityhubli.netlify.app`, POST in allowed methods, and Content-Type in allowed headers. POST should return 201 and a JSON `id`, with the same allow-origin header.
- Test Admissions both with and without a small PDF attachment. Verify the success modal and the saved database rows; check notification delivery separately if configured.
- For localhost, leave `VITE_API_URL` empty and run `npm run dev`; Vite serves the local API automatically. To test a remote backend locally, set its URL in `.env.local` and restart Vite.

Automated tests use isolated databases and mocked/disabled email. They verify JSON, attachments, validation, CORS, the shared client with a configured URL, and local development/preview routing. Live Netlify-to-backend verification is pending the real backend URL and redeployment.
