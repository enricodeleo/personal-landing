# Repository Guidelines

## Project Structure & Module Organization
`app/` holds the Nuxt 4 source (configured as `srcDir` in `nuxt.config.ts`). Route files live in `app/pages/`, reusable UI in `app/components/`, layouts in `app/layouts/`, and global assets/styles in `app/assets/` (entry at `app/assets/css/main.css`). `app/app.vue` is the root shell. `static/` is for files copied as-is to the site (example: `static/favicon.ico`). `dist/` is generated build output from `npm run build`/`npm run generate` and should not be edited.

## Build, Test, and Development Commands
- Use npm; `package-lock.json` is the source of truth (avoid Yarn/pnpm).
- `npm install` installs dependencies.
- `npm run dev` starts the Nuxt dev server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm run generate` performs static generation (Nitro preset: `static`).
- `npm run preview` serves the production build locally.
- `npm run lint` / `npm run lint:fix` runs ESLint checks and auto-fixes issues.

## Coding Style & Naming Conventions
Use 2-space indentation and follow the existing Vue SFC pattern (`<template>`, `<script setup>`, `<style>`). Prefer single quotes and omit semicolons to match current files. Name components in `app/components/` with PascalCase (for example, `HeroBanner.vue`). Keep global styles in `app/assets/css/main.css`; component-level styles belong inside the SFC.

## Testing Guidelines
No automated test framework is configured. If you add tests, place them in `tests/` and use names like `*.spec.ts` or `*.test.ts`, then introduce a corresponding `npm run test` script.

## Commit & Pull Request Guidelines
Follow Conventional Commits as seen in history: `feat: add hero CTA`, `fix: resolve build error`, `chore: update deps`. PRs should include a short description, relevant issue links, and screenshots for UI changes. Run `npm run lint` before opening a PR.

## Configuration & Environment
Public runtime config lives in `nuxt.config.ts` under `runtimeConfig.public`; the site URL can be overridden with `NUXT_PUBLIC_SITE_URL`. Update analytics and PWA settings in `nuxt.config.ts` if IDs or assets change.
