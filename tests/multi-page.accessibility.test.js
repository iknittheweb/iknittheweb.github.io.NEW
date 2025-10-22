// Automated accessibility tests for all key pages using axe-core and Jest
const axe = require('axe-core');
const fs = require('fs');
const { JSDOM } = require('jsdom');

// List of pages to test (add more as needed)
const pages = [
  'dist/index.html',
  'dist/pages/portfolio.html',
  'dist/pages/contact.html',
  'dist/pages/about.html',
  // Add other important pages here
];

describe('Accessibility audit for all key pages', () => {
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
