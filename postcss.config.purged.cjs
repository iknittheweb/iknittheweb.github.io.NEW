const purgecss = require('@fullhuman/postcss-purgecss').default;
const prettify = require('postcss-prettify');
module.exports = {
  plugins: [
    purgecss({
      content: ['dist/pages/*.html'],
      safelist: ['header-hidden', 'show', 'skills-chart__tab--active', 'skills-chart__category--active'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    prettify({ expand: true }),
  ],
};
