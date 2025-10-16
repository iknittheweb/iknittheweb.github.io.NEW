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
// - PurgeCSS: Removes unused CSS selectors to keep your CSS files small and fast.
//
// 🚨 IMPORTANT: Per-page purged CSS is now automated in the build script (component-build.cjs).
// For each HTML page, PurgeCSS is run with only that page's HTML as the content source.
// This means each purged CSS file contains only the styles actually used in its page (including header/footer).
// The 'content' array below is only used for manual/global purging, not for the automated per-page process.
// ------------------------------------------------------------
// postcss.config.cjs
const purgecss = require('@fullhuman/postcss-purgecss').default;

// 🚨 DO NOT ADD cssnano or any minifier here! Minification is handled only in per-file configs by the build script.
// This config is for manual/global purging only, and should output readable CSS.
module.exports = {
  plugins: [
    purgecss({
      content: ['./index.html', './src/pages/**/*.html', './index.template.html', './src/templates/*.template.html'],
      safelist: ['header-hidden', 'show', 'skills-chart__tab--active', 'skills-chart__category--active'], // Prevent PurgeCSS from removing this dynamic class
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
