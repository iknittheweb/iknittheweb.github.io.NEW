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
