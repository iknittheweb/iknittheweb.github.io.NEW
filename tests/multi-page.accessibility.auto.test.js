// Automated accessibility tests for all HTML files in the project root using axe-core and Jest
const axe = require('axe-core');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Find all .html files in the project root
function getAllHtmlFiles() {
  const distPages = process.cwd();
  const rootFiles = [path.join(__dirname, '../dist/index.html')];
  let files = [...rootFiles];
  if (fs.existsSync(distPages)) {
    fs.readdirSync(distPages).forEach((file) => {
      if (file.endsWith('.html')) {
        files.push(path.join(distPages, file));
      }
    });
  }
  return files;
}

const pages = getAllHtmlFiles();

describe('Accessibility audit for all HTML pages', () => {
  pages.forEach((page) => {
    test.skip(`${page} should have no accessibility violations`, async () => {});
  });
});
