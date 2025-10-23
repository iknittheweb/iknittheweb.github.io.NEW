/*
  purge-and-minify.js
  -------------------------------------------------------------
  TEACHER-STYLE EXPLANATION FOR BEGINNERS:

  Welcome! This script is your CSS cleanup assistant. Its job is to make sure your CSS files only contain styles that are actually used on each page, and that those styles are easy to read.

  Here's what happens step-by-step:
   1. The script looks for all your CSS files in the "dist/css" folder.
  2. For each CSS file, it finds the matching HTML file in "dist/pages" (for example, "portfolio.css" matches "portfolio.html").
  3. It creates a temporary config file that tells PurgeCSS to scan only that HTML file for used selectors.
  4. It runs PostCSS with PurgeCSS and postcss-prettify, which removes unused styles and makes the CSS readable.
  5. It saves the cleaned CSS as a new file ending in ".purged.css".
  6. It deletes the temporary config file to keep things tidy.

  This script does NOT minify (shrink) your CSS, compile SCSS, or create separate header/footer/hero CSS files. It's focused on purging and prettifying only.
*/

// These are Node.js modules that help us work with files, folders, and run commands:
const fs = require('fs'); // For reading and writing files and folders
const path = require('path'); // For building file and folder paths
const { execSync } = require('child_process'); // For running terminal commands from Node.js

// This sets the folder where your CSS files live.
// __dirname means "the folder where this script is located".
const cssDir = path.join(__dirname, 'dist', 'css');

// Ensure dist/css exists (create if missing)
fs.mkdirSync(cssDir, { recursive: true });

// This function purges a CSS file using PurgeCSS CLI, then renames the purged file to overwrite the original for deployment.
function purgeAndReplace(file) {
  let base = file.endsWith('.min.css') ? path.basename(file, '.min.css') : path.basename(file, '.css');
  // Special case: styles.css should use index.html
  const htmlFile = path.join(__dirname, 'dist', 'pages', base === 'styles' ? 'index.html' : `${base}.html`);
  const purged = path.join(cssDir, `purged-${base}.css`);

  // Only purge if matching HTML file exists
  if (fs.existsSync(htmlFile)) {
    execSync(`npx purgecss --css "${file}" --content "${htmlFile}" --output "${purged}"`, { stdio: 'inherit' });
    fs.renameSync(purged, file);
  } else {
    console.warn(`Skipping ${file}: No matching HTML file (${htmlFile}) found.`);
  }
}

// Only process if dist/css exists
if (fs.existsSync(cssDir)) {
  fs.readdirSync(cssDir).forEach((file) => {
    // Only process .css and .min.css files, skip already purged/minified files
    if ((file.endsWith('.css') || file.endsWith('.min.css')) && !file.startsWith('purged-')) {
      purgeAndReplace(path.join(cssDir, file));
    }
  });
} else {
  console.warn('Warning: dist/css directory does not exist. Skipping CSS purging.');
}
