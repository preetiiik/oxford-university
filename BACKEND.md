# Contact and admissions backend

Requires Node 24.12+ (or Node 26). Uses Node's built-in SQLite database with Nodemailer for Gmail SMTP notifications.

## Local development

1. Copy `.env.example` to `.env` and enter your email settings.
2. Run `npm.cmd run dev` on Windows (`npm run dev` elsewhere). This starts both Vite and the API on port 3001.
3. Submit Apply Now or Admissions. Successful submissions are saved to `data/enquiries.sqlite` before success is shown.

Email uses Gmail SMTP over TLS (port 465): set `GMAIL_USER` (your full Gmail address), `GMAIL_APP_PASSWORD` (a Google App Password) and `CONTACT_EMAIL_TO` (the admissions recipient). Enable 2-Step Verification and create an app password using [Google instructions](https://support.google.com/mail/answer/185833). Spaces in the app password are removed automatically. Restart the backend after changing `.env`. No credentials belong in frontend code or `VITE_` variables. Without email configuration, submissions remain stored and their notifications stay queued. After configuration and restart, pending notifications are sent.

The queue retries failed notifications up to eight times with increasing delays. Inspect `email_queue` for unsent entries; after correcting a persistent provider error, an operator can reset `attempts` and `next_attempt` to zero to retry. Notifications include submitted text and the attachment filename; uploaded documents stay in the private database and are not emailed.

## Production

Run `npm run build`; serve `dist` through your web server and proxy `/api/contact` to `npm run server` on port 3001. Use HTTPS and persistent storage for `DATABASE_PATH`, with restricted filesystem access and backups. Static-only hosting cannot run this backend. `npm run preview` also proxies the API for local build checks; run `npm run server` separately for preview.

`POST /api/contact` accepts multipart form fields `name`, `email`, `phone`, `course`, optional `message`, `dateOfBirth` and `document`. PDFs, PNGs and JPEGs up to 5 MB are accepted. Input validation, request size limits and a basic per-connection-IP limit are enforced. Configure per-client rate limiting at your reverse proxy in production; the application deliberately does not trust forwarded IP headers.

There is no public submissions endpoint. An operator can inspect the local SQLite `enquiries` and `email_queue` tables using a database client. Never serve the `data` directory publicly.

## Verification

`npm test` runs isolated backend tests with temporary databases and mocked email delivery. It does not send real email. `npm run build` checks TypeScript and builds the frontend.

SMTP retries use a stable Message-ID, but SMTP cannot guarantee exactly-once delivery after an ambiguous connection failure; a retry may produce a duplicate notification.
