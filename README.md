# Oxford Institution — React + Vite

Responsive five-page implementation of the supplied Oxford Institutions Figma design for desktop, tablet, and mobile.

## Included routes

- `#/` — Home
- `#/departments` — Departments
- `#/bba-department` — BBA Department
- `#/campus` — Campus
- `#/admissions` — Admissions and application form

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The site is component-driven and uses responsive CSS breakpoints at 1050px, 820px, and 560px. Shared navigation, footer, programme cards, testimonials, contact details, and CTA links can be updated directly in `src/App.tsx`.

The imagery currently references the exact Figma-exported assets. Before a long-term production deployment, download those image files into `public/assets` and update `src/assets.ts`, because Figma export URLs are temporary.
