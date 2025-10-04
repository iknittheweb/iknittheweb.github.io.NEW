// Stylelint configuration with explanatory comments
module.exports = {
  // Extends standard and recommended SCSS configs for best practices
  extends: [
    'stylelint-config-standard', // Standard Stylelint rules
    'stylelint-config-recommended-scss', // Recommended SCSS rules
  ],
  // Adds SCSS-specific linting rules
  plugins: [
    'stylelint-scss', // SCSS plugin for Stylelint
  ],
  // Custom rules
  rules: {
    // Disable core at-rule check (SCSS uses custom at-rules)
    'at-rule-no-unknown': null,
    // Enable SCSS-aware at-rule check
    'scss/at-rule-no-unknown': true,
    // Enforce BEM naming for CSS classes
    'selector-class-pattern': [
      '^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      {
        // Custom error message for BEM naming
        message: 'Class names should be written in BEM (block__element--modifier) style.',
      },
    ],
  },
};
