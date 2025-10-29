# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/iknittheweb/iknittheweb.github.io.NEW/compare/v1.1.0...v1.1.1) (2025-10-29)


### Bug Fixes

* **html:** update index.html and template for build changes ([4abdd5f](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/4abdd5fad6e8f16e34c96c16e8b230d18f1adb62))

## 1.1.0 (2025-10-29)


### Features

* add comprehensive build system with environment support ([5965212](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/5965212148d3572442d578f4b59b022b5607a4d1))
* **assets:** add apple touch favicon ([e238a26](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/e238a269928816f5509aabcb21c42e57bf25f618))
* **build,docs,ui:** refactor build system, update onboarding docs, modularize JS, and improve UI ([050bb42](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/050bb429667d554b31afa32ac4d2889416604d17))
* **build:** support DOTENV_CONFIG_PATH for alt environment ([1fb74b9](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/1fb74b9a437316dd9301125ecf22d12ad0c86a92))
* comprehensive website redesign with new component system and linting fixes ([78b8e83](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/78b8e83e63adec170e6a1bb04a85a9a4b21db969))
* **config:** add manifest and env script ([30e8cc9](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/30e8cc9a297171a57ee408bd183d2cfece242824))
* **html:** update HTML files for new build and content ([a1e75b1](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/a1e75b10e896baf18a06c6b2339e94793141f503))
* integrate CSS building into npm scripts ([1483a9b](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/1483a9bf2c71bb8855120a7d114956cfbb3eef56))
* **js:** add WebP detection for hero background ([80acf21](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/80acf21a779981a36162783552678510fd77f1dd))
* **js:** update contact form and main script ([05fb06c](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/05fb06c1339455d428b258e5906da890fc0b5f2d))
* **navigation:** add navigation.js to version control ([1e711d9](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/1e711d91dbfe4378c2aced7324bc689fe17b8bfa))
* production deployment build with optimized CSS ([c4f7acc](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/c4f7acc438a5bec26294cf4570399f91bfffd5d9))
* restore source maps for better development experience ([6790872](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/67908728f932e2f41622af32e2eeaba65a3934d7))
* **styles:** add SCSS for vertical navbars and desc list ([8b83e82](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/8b83e8239e77009196ebf1c77954d7c063dd1d72))
* **templates,components:** update templates and components ([8e51347](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/8e51347480c37237fdfb74a52a1cab333b3465cd))
* **templates:** add new page templates ([27c4f5c](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/27c4f5c1d432ca283119c0136ee1c40af20e3e1e))
* **templates:** update main HTML templates and navigation logic ([6f621c7](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/6f621c7ebc3f70df0b9c6e3ed13bfeedea665e01))
* **templates:** use env-based hero image in templates ([7b20952](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/7b20952461f4b219f064e692f79028277be76587))


### Bug Fixes

* **accessibility, build, config:** make axe-core accessibility tests pass; update build and config ([3a584ac](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/3a584ac0910730f698a275cc8e9728c6dd2e2b07))
* **accessibility, ci:** skip missing files in accessibility test to prevent CI/CD build failures ([55125b6](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/55125b6200d1a60255c4529e91adf7284f6e8c6c))
* **accessibility, dependencies:** add canvas package to resolve HTMLCanvasElement error in CI ([55b9132](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/55b913217613e3a385861efa17157dd166e12496))
* **assets:** copy all image types to dist ([7609ffc](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/7609ffc10dae1c35b74d9f10e8e0cf779d565f81))
* **build:** always create dist/css before purging to prevent ENOENT ([b61311a](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/b61311a52b020f4421d732c3d9045c8787cafc46))
* **build:** compile only styles.scss to dist/css/styles.css before purge ([aac92bf](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/aac92bf5be5a7f2a0b030b259e0c8a634d92e598))
* **build:** ensure dist folder exists before writing index.html ([36a613c](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/36a613cd6b98d687615bee76c6ff1162d63980ea))
* **build:** ensure only non-minified CSS files are purged and output is readable ([7fbcb4b](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/7fbcb4b6efbeeef315ccf6859f2189bbbdef84be))
* **build:** handle missing dist/css gracefully in purge script ([ffabb2e](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/ffabb2e9909326057a542794e32c398e1b6562d8))
* **build:** output index.html to dist and update reference in component-build ([e5a4826](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/e5a4826907a17339fd90db5297da784a49010a32))
* **build:** output index.html to dist for Netlify deploy ([0f0693e](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/0f0693e10ff414f0fac96f773459051309858da1))
* **build:** safelist .header-hidden in PurgeCSS config to prevent removal of dynamic class ([2ba71bb](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/2ba71bba6b3e4fe98a3db4412dcb6c81ef0dca40))
* **ci, cypress:** ensure Cypress binary is installed in CI/CD ([d9f6c5a](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/d9f6c5acec27f576de5899a8d88c558edc50c064))
* configure URLs for GitHub Pages deployment ([eb3ad53](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/eb3ad536e4f5011121b860b09728ec30c22793ce))
* correct asset URLs for GitHub Pages deployment ([8d68ff8](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/8d68ff8dda73f4f8d5ca78b8f69da6e8a6252a82))
* eliminate CORS errors by using system fonts only ([00c0c24](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/00c0c2488063d36cca278f2553273bb340065740))
* ensure correct JavaScript and asset URLs for GitHub Pages ([9e718bb](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/9e718bb9bddadd17074eb74685ce3b785e93cb87))
* include CSS files in repository for GitHub Pages ([6df16c3](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/6df16c385db92a8fb1723151d98593ee218fcf3b))
* **index.template.html:** added missing angle bracket before header ([3c2914e](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/3c2914e709cebad0c2c2a5e906fb22185f5ac314))
* **js:** update Sentry usage and interactive logic ([39aec58](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/39aec58ca60440d7347473ed47570a796b70c718))
* prevent Flash of Unstyled Content (FOUC) and layout thrashing ([c154759](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/c154759f239648b5aa3046070608f1aebc4b7977))
* remove source map references from CSS files for GitHub Pages ([fe2f77c](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/fe2f77cfb680d4456e0e95b74a5da0927e91f28f))
* remove type='module' from script.js to resolve MIME type error ([fdb2cce](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/fdb2cce52c5d5d0de0d3ca1c3795c58243335005))
* resolve Google Fonts CORS errors with robust fallback system ([2def640](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/2def640fe24ae452b118eae18bc78e96a7921f5e))
* **scss:** fix media queries and improve component styles ([3be39b6](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/3be39b63c52811d179d38817786cab8439cbe788))
* **scss:** fix reset styles and improve base SCSS ([0d26c4b](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/0d26c4b9236683994da95eaaf7695690153c37c0))
* **scss:** fix SCSS import paths for modular structure ([0e6846a](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/0e6846a4a3472b385d4812b13272e193b67ecb32))
* **templates,css:** fix template syntax and update compiled CSS files ([3a63b7d](https://github.com/iknittheweb/iknittheweb.github.io.NEW/commit/3a63b7d87368b72faf3c5d16c777778d7087a1a6))

# Changelog

## [2025-10-28] Major Updates: Templates, Build, Environment, Docs

- **New HTML templates added:**
  - `src/templates/multi-level-navbar.template.html`
  - `src/templates/about.template.html`
  - `src/templates/contact.template.html`
  - `src/templates/portfolio.template.html`
  - `src/templates/new-page.template.html`
- **New SCSS files for pages/components:**
  - `src/scss/E-pages/fifteenDaysOfCSS-Day4-BasicVerticalNavbars.scss`
  - `src/scss/E-pages/fifteenDaysofHTML-Day5-Desc-List-Challenge.scss`
  - `src/scss/E-pages/multi-level-navbar.scss`
  - `src/scss/E-pages/new-page.scss`
- **Build system improvements:**
  - Enhanced asset copy logic in build scripts to include all files.
  - Automated environment selection via DOTENV_CONFIG_PATH and npm scripts.
  - Added support for alternate environments (`.env.alt`, `.env.netlify-alt`).
- **Documentation updates:**
  - Updated `README.md` and guides in `docs/` for new templates, build workflow, and environment automation.
  - Improved placeholder and environment variable documentation for template generation.
- **Accessibility & testing:**
  - Improved accessibility test scripts and clarified jsdom resource load errors.
- **General:**
  - Various bug fixes, refactoring, and workflow improvements.

See commit history for details.

## [2025-10-02] Systematic SCSS Review & BEM/Stylelint Compliance

- All SCSS files in `src/scss/` (`abstracts`, `base`, `components`, `pages`, `utils`) reviewed top-down
- Fixed all Stylelint errors (BEM, duplicates, deprecated properties, etc.)
- Enforced BEM/class naming consistency
- Removed empty/obsolete files
- Verified all `@forward`/`@use` index files
- No legacy or non-compliant class names remain
- Codebase is now fully modern, maintainable, and error-free

See commit history for details.

## Latest Component Changes

- src\js\alien-abduction-form.js (last modified: 2025-10-18)
- src\js\bodyScrollLock.min.js (last modified: 2025-10-18)
- src\js\components.js (last modified: 2025-10-18)
- src\js\contactForm.js (last modified: 2025-10-20)
- src\js\dropdown.js (last modified: 2025-10-20)
- src\js\navigation.js (last modified: 2025-10-20)
- src\js\script.js (last modified: 2025-10-20)
- src\js\skillsChart.js (last modified: 2025-10-20)
- src\scss\A-abstracts_colors.scss (last modified: 2025-10-12)
- src\scss\A-abstracts_functions.scss (last modified: 2025-10-04)
- src\scss\A-abstracts_helpers.scss (last modified: 2025-10-14)
- src\scss\A-abstracts_index.scss (last modified: 2025-10-04)
- src\scss\A-abstracts_mixins.scss (last modified: 2025-10-14)
- src\scss\A-abstracts_placeholders.scss (last modified: 2025-10-04)
- src\scss\A-abstracts_variables.scss (last modified: 2025-10-04)
- src\scss\B-base_index.scss (last modified: 2025-10-04)
- src\scss\B-base_reset.scss (last modified: 2025-10-08)
- src\scss\B-base_typography.scss (last modified: 2025-10-19)
- src\scss\B-base_utilities.scss (last modified: 2025-10-07)
- src\scss\C-components_about-section.scss (last modified: 2025-10-19)
- src\scss\C-components_alien-form.scss (last modified: 2025-10-19)
- src\scss\C-components_breadcrumbs.scss (last modified: 2025-10-19)
- src\scss\C-components_buttons.scss (last modified: 2025-10-14)
- src\scss\C-components_calculator.scss (last modified: 2025-10-19)
- src\scss\C-components_card.scss (last modified: 2025-10-19)
- src\scss\C-components_code-showcase.scss (last modified: 2025-10-19)
- src\scss\C-components_contact.scss (last modified: 2025-10-19)
- src\scss\C-components_dropdown.scss (last modified: 2025-10-19)
- src\scss\C-components_footer.scss (last modified: 2025-10-19)
- src\scss\C-components_forms.scss (last modified: 2025-10-19)
- src\scss\C-components_hero.scss (last modified: 2025-10-19)
- src\scss\C-components_index.scss (last modified: 2025-10-15)
- src\scss\C-components_navbar.scss (last modified: 2025-10-18)
- src\scss\C-components_portfolio.scss (last modified: 2025-10-19)
- src\scss\C-components_skills-chart.scss (last modified: 2025-10-19)
- src\scss\C-components_sparkle-animations.scss (last modified: 2025-10-07)
- src\scss\C-components_topnav.scss (last modified: 2025-10-19)
- src\scss\D-layout_containers.scss (last modified: 2025-10-19)
- src\scss\D-layout_footer.scss (last modified: 2025-10-04)
- src\scss\D-layout_grid.scss (last modified: 2025-10-04)
- src\scss\D-layout_header.scss (last modified: 2025-10-04)
- src\scss\D-layout_index.scss (last modified: 2025-10-04)
- src\scss\D-layout_navigation.scss (last modified: 2025-10-04)
- src\scss\D-layout_sidebar.scss (last modified: 2025-10-04)
- src\scss\E-pages\about.scss (last modified: 2025-10-18)
- src\scss\E-pages\alien-abduction-form.scss (last modified: 2025-10-19)
- src\scss\E-pages\calculator.scss (last modified: 2025-10-19)
- src\scss\E-pages\contact.scss (last modified: 2025-10-15)
- src\scss\E-pages\css-position-cheat-sheet.scss (last modified: 2025-10-15)
- src\scss\E-pages\fifteenDaysOfCSS-Day4-BasicVerticalNavbars.scss (last modified: 2025-10-15)
- src\scss\E-pages\fifteenDaysofHTML-Day5-Desc-List-Challenge.scss (last modified: 2025-10-15)
- src\scss\E-pages\multi-level-navbar.scss (last modified: 2025-10-19)
- src\scss\E-pages\navbar-link-filling-li.scss (last modified: 2025-10-15)
- src\scss\E-pages\new-page.scss (last modified: 2025-10-18)
- src\scss\E-pages\portfolio.scss (last modified: 2025-10-19)
- src\scss\E-pages\test-case.scss (last modified: 2025-10-18)
- src\scss\E-pages_index.scss (last modified: 2025-10-18)
- src\scss\F-themes_dark-theme.scss (last modified: 2025-10-04)
- src\scss\F-themes_index.scss (last modified: 2025-10-04)
- src\scss\F-themes_light-theme.scss (last modified: 2025-10-04)
- src\scss\G-vendors_bootstrap.scss (last modified: 2025-10-04)
- src\scss\G-vendors_index.scss (last modified: 2025-10-04)
- src\scss\G-vendors_plugin-name.scss (last modified: 2025-10-04)
- src\scss\styles.scss (last modified: 2025-10-19)
