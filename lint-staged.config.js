module.exports = {
  'src/**/*.js': ['eslint --fix', 'prettier --write'],
  'src/**/*.{css,scss,html}': ['prettier --write'],
  'build.js': ['eslint --fix', 'prettier --write'],
  'component-build.js': ['eslint --fix', 'prettier --write'],
};
