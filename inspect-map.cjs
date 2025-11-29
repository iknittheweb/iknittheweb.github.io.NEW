// inspect-map.js
// Usage: node inspect-map.js path/to/styles.css.map
const fs = require('fs');
const path = require('path');

const p = process.argv[2];
if (!p) {
  console.error('Usage: node inspect-map.js path/to/styles.css.map');
  process.exit(2);
}

const full = path.resolve(p);
if (!fs.existsSync(full)) {
  console.error('File not found:', full);
  process.exit(3);
}

try {
  const m = JSON.parse(fs.readFileSync(full, 'utf8'));
  const summary = {
    sourceRoot: m.sourceRoot === '' ? '(empty string)' : m.sourceRoot,
    sourcesCount: (m.sources || []).length,
    hasSourcesContent: !!m.sourcesContent,
    sourcesWithDotDot: (m.sources || [])
      .filter((s) => s.startsWith('../') || s.includes('/../'))
      .slice(0, 20),
  };
  console.log(JSON.stringify(summary, null, 2));
  console.log('');
  console.log('example source[0]:', (m.sources || [])[0] || '(none)');
  if (m.sourcesContent && m.sourcesContent.length > 0) {
    console.log('');
    console.log('sourcesContent length =', m.sourcesContent.length);
    console.log('first 200 chars of sourcesContent[0]:');
    console.log('--------------------------------------------------');
    console.log(m.sourcesContent[0].slice(0, 200));
    console.log('--------------------------------------------------');
  } else {
    console.log('no sourcesContent present in this map.');
  }
} catch (err) {
  console.error('Error reading/parsing map:', err.message);
  process.exit(4);
}
