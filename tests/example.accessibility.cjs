// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file contains accessibility tests for your website.
// Accessibility tests check that your site is usable by people with disabilities.
//
// Key concepts:
// - Accessibility: Making your site usable for everyone
// - Automated test: Checks for common accessibility issues
// - ARIA: Attributes that help screen readers and assistive tech
// ------------------------------------------------------------
// Example accessibility test using axe-core
const { configureAxe, getViolations } = require('axe-core');
const fs = require('fs');
const { JSDOM } = require('jsdom');

test('homepage should have no accessibility violations', async () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const dom = new JSDOM(html);
  const axe = configureAxe(dom.window.document);
  const results = await axe.run(dom.window.document);
  expect(results.violations.length).toBe(0);
});
