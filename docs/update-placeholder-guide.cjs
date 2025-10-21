// update-placeholder-guide.js
// Scans new-page.template.html for placeholders and updates line numbers in new-page-placeholder-replacement-guide.txt
// Usage: node docs/update-placeholder-guide.js

const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../src/templates/new-page.template.html');
const guidePath = path.join(__dirname, 'new-page-placeholder-replacement-guide.txt');

// Regex for placeholders: {{SOME_PLACEHOLDER}}
const placeholderRegex = /\{\{([A-Z0-9_\-]+)\}\}/g;

// Read template file
const templateLines = fs.readFileSync(templatePath, 'utf8').split(/\r?\n/);

// Find placeholders and their line numbers
const placeholders = {};
templateLines.forEach((line, idx) => {
  let match;
  while ((match = placeholderRegex.exec(line)) !== null) {
    placeholders[match[1]] = idx + 1; // 1-based line number
  }
});

// Read guide file
let guide = fs.readFileSync(guidePath, 'utf8');

// Update guide: replace line numbers for each placeholder
Object.entries(placeholders).forEach(([name, lineNum]) => {
  // Match lines like: {{PLACEHOLDER}} — line XX
  const guideRegex = new RegExp(`(\{\{${name}\}\} — line )\d+`, 'g');
  guide = guide.replace(guideRegex, `$1${lineNum}`);
});

// Optionally, add missing placeholders to the guide
Object.entries(placeholders).forEach(([name, lineNum]) => {
  if (!guide.includes(`{{${name}}}`)) {
    guide += `\n{{${name}}} — line ${lineNum}`;
  }
});

fs.writeFileSync(guidePath, guide, 'utf8');

console.log('Placeholder guide updated with current line numbers.');
