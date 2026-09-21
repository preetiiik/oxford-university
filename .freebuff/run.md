# Run doc — Oxford Institutions (Vite + React + TS)

## Reproduce the artifacts

1. **No env files needed.** The project has no `.env*` files; nothing to copy.
2. **Install dependencies** with npm (project uses `package-lock.json`):
   ```bash
   npm install
   ```
   Deps include react, react-router-dom, lucide-react, vite + `@vitejs/plugin-react`, and
   Tailwind CSS v4 via the `@tailwindcss/vite` plugin (configured in `vite.config.ts`).
3. **Home + department + campus images.** `src/assets/home/` (17 files) and
   `src/assets/departments/` (8 files) download from the Figma CDN; `src/assets/campus/`
   (11 files) converts from the user-supplied PNGs in `Downloads\campus-photos`. If missing:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File ".freebuff\download-home-assets.ps1"
   powershell -NoProfile -ExecutionPolicy Bypass -File ".freebuff\download-department-assets.ps1"
   powershell -NoProfile -ExecutionPolicy Bypass -File ".freebuff\import-campus-assets.ps1"
   ```
   (Download from the Figma CDN URLs originally in `src/assets.ts`; both scripts skip files that exist.)

## Run the dev server

```bash
npm run dev
```

- Vite serves on its default port **5173** (`http://localhost:5173/`). No port is hardcoded;
  if 5173 is taken pass `--port <free-port>`.
- Build/typecheck: `npm run build` (`tsc -b && vite build`).
- Windows detached start (used for this preview):
  ```powershell
  powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
  ```
  Note: the tool call may report a timeout while npm spawns — poll the log and the port
  before retrying. Confirm with `Get-Process -Id <pid>` (the node *child* pid) and
  `Invoke-WebRequest http://localhost:5173/`.
- Caveat: creating/deleting files inside `src/assets/` while the server runs can crash the
  Vite watcher on Windows (EBUSY). Restart the server after bulk asset changes.

## Notes

- `src/Home.tsx` (attached design) is the Tailwind home page; `App.tsx` renders its
  `HomeSections` export for the `/` route. `src/Departments.tsx` (`DepartmentsSections` on
  `/departments`) and `src/Campus.tsx` (`CampusSections` on `/campus`) follow the same
  pattern and reuse `Header`, `Footer`, and `PageStyles` from `Home.tsx`. Remaining inner
  pages (bba-department, admissions) stay on the plain-CSS layout with the shared
  `Header`/`Footer` from `App.tsx`.
- `src/styles.css` imports `tailwindcss`; preflight resets that the plain-CSS pages rely
  on are re-declared right after the import.
