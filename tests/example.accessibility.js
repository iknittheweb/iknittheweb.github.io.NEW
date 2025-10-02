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
