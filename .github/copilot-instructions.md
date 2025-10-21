# Copilot Instructions for iknittheweb.github.io.NEW

## Project Overview

This is a static portfolio site built with custom HTML, modular SCSS (BEM convention), and JavaScript. The build system
is custom, using Node scripts for environment management and page/component generation.

## Architecture & Key Patterns

- **Templates:** Edit `.template.html` files in `src/templates/` for page content. Do NOT edit generated files in
  `dist/` or `index.html` directly.
- **Build System:**
  - `build.js` and `component-build.cjs` generate pages from templates, injecting environment variables and shared
    components.
  - Placeholders like `{{TITLE}}`, `{{DESCRIPTION}}`, etc., are auto-replaced. Generated files include a warning comment
    if defaults are used.
- **SCSS:** Modularized by type/page in `src/scss/`. Follows BEM naming. Legacy CSS in `src/css/` is being migrated.
- **Images:** Organized in `src/img/` by type/page.
- **Docs & Notes:** Technical guides in `docs/`, planning in `notes/`.

## Developer Workflow

- **Edit content:**
  - Homepage: `index.template.html`
  - Other pages: `src/pages/`
  - Styles: `src/scss/`
- **Build commands:**
  - `npm run dev` (development build)
  - `npm run deploy` (production build)
  - `npm run local` (local build, purged CSS)
  - `node build.js` or `node build.js production` (manual build)
  - `node component-build.cjs` (build all pages/components)
- **Environment variables:**
  - `.env` (dev), `.env.production` (prod), `.env.example` (template)
  - Key vars: `BASE_URL`, `ASSET_URL`
- **Testing & Quality:**
  - Unit tests: `npm test` (Jest, files in `tests/`)
  - E2E tests: `npm run test:e2e` (Cypress)
  - SCSS lint: `npm run test:style` (Stylelint)
  - Accessibility: `npm run test:a11y` (axe-core)
- **Linting/Formatting:**
  - Pre-commit hooks (Husky, lint-staged) auto-lint/format staged files.
  - Commit messages follow Conventional Commits (use Commitizen: `npx cz`).

## Conventions & Integration

- **BEM CSS:** All new styles must use BEM. Stylelint enforces this.
- **Do not commit `.env` files.** Use `.env.example` as a template.
- **Generated HTML files include a warning if placeholders are not set. Always review before deploying.**
- **Changelog:** See `CHANGELOG.md` for history and compliance notes.

## Examples

- **To add a new page:** Duplicate and rename `src/templates/new-page.template.html`, update all page-specific placeholders (e.g., `{{TITLE}}`, `{{DESCRIPTION}}`), update build scripts if needed, and rebuild.
- To migrate CSS: move styles from `src/css/` to modular SCSS in `src/scss/`, following BEM.
- To update environment: copy `.env.example` to `.env`/`.env.production`/`.env.alt` and set required variables.

---

For more details, see `README.md` and documentation in `docs/`.
