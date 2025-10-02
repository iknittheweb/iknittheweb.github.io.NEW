# Changelog

## [2025-10-02] Systematic SCSS Review & BEM/Stylelint Compliance

- All SCSS files in `src/scss/` (`abstracts`, `base`, `components`, `pages`, `utils`) reviewed top-down
- Fixed all Stylelint errors (BEM, duplicates, deprecated properties, etc.)
- Enforced BEM/class naming consistency
- Removed empty/obsolete files
- Verified all `@forward`/`@use` index files
- No legacy or non-compliant class names remain
- Codebase is now fully modern, maintainable, and error-free

See commit history for details.
