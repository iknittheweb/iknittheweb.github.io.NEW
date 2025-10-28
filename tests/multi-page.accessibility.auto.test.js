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
    test(`${page} should have no accessibility violations`, async () => {
      const html = fs.readFileSync(page, 'utf8');
      // Debug: Log the loaded HTML to confirm <html lang="en"> is present
      console.log(`\n--- DEBUG: Loaded HTML for ${page} ---\n`);
      console.log(html.slice(0, 5000)); // Print first 5000 chars for brevity
      if (!html.includes('<html lang="en"')) {
        console.warn(`\nWARNING: <html lang="en"> not found in ${page}!\n`);
      }
      const dom = new JSDOM(html);
      const results = await axe.run(dom.window.document);
      if (results.violations.length > 0) {
        // Print violations for easier debugging
        console.error(`Accessibility violations in ${page}:`, results.violations);
      }
      expect(results.violations.length).toBe(0);
    });
  });
});
