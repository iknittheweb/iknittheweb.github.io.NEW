// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file configures PostCSS, a tool for processing CSS files.
// You can use plugins to add features, fix browser issues, or optimize CSS.
//
// Key concepts:
// - PostCSS: Tool for transforming CSS with JavaScript
// - Plugin: Adds extra features or fixes to CSS
// - Configuration: Controls how PostCSS works for your project
// ------------------------------------------------------------
// postcss.config.cjs
const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    purgecss({
      content: ['./index.html', './src/pages/**/*.html'],
      safelist: ['header-hidden', 'show', 'skills-chart__tab--active', 'skills-chart__category--active'], // Prevent PurgeCSS from removing this dynamic class
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
