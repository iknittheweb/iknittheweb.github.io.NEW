/*
  purge-and-minify.js
  -------------------------------------------------------------
  TEACHER-STYLE EXPLANATION FOR BEGINNERS:

  Welcome! This script is your CSS cleanup assistant. Its job is to make sure your CSS files only contain styles that are actually used on each page, and that those styles are easy to read.

  Here's what happens step-by-step:
   1. The script looks for all your CSS files in the "dist/css" folder.
  2. For each CSS file, it finds the matching HTML file in the project root (for example, "portfolio.css" matches "portfolio.html").
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
const postcss = require('postcss');
const cssnano = require('cssnano');

// This sets the folder where your CSS files live.
// __dirname means "the folder where this script is located".
const cssDir = path.join(__dirname, 'dist', 'css');

// Ensure dist/css exists (create if missing)
fs.mkdirSync(cssDir, { recursive: true });

// This function purges a CSS file using PurgeCSS CLI, then renames the purged file to overwrite the original for deployment.
async function purgeAndReplace(file) {
  let base = file.endsWith('.min.css')
    ? path.basename(file, '.min.css')
    : path.basename(file, '.css');
  let htmlFiles;
  if (base === 'styles') {
    // Only use index.html for styles.css
    htmlFiles = [path.join(__dirname, 'index.html')];
  } else {
    // Match all HTML files in the project root with the pattern base.*.html
    const allFiles = fs.readdirSync(__dirname);
    htmlFiles = allFiles
      .filter((f) => f.startsWith(base + '.') && f.endsWith('.html'))
      .map((f) => path.join(__dirname, f));
  }
  const purged = path.join(cssDir, `purged-${base}.css`);

  // Only purge if all matching HTML files exist
  const allExist = htmlFiles.every((f) => fs.existsSync(f));
  if (allExist) {
    const contentArgs = htmlFiles.map((f) => `--content "${f}"`).join(' ');
    execSync(
      `npx purgecss --css "${file}" ${contentArgs} --safelist skills-chart__tab--active skills-chart__category--active --output "${purged}"`,
      { stdio: 'inherit' }
    );
    fs.renameSync(purged, file);
    // Minify after purging
    const css = fs.readFileSync(file, 'utf8');
    const minified = await postcss([cssnano]).process(css, { from: file });
    const minFile = file.replace(/\.css$/, '.min.css');
    fs.writeFileSync(minFile, minified.css);
  } else {
    console.warn(
      `Skipping ${file}: No matching HTML file(s) (${htmlFiles.join(', ')}) found.`
    );
  }
}

// Only process if dist/css exists
async function run() {
  if (fs.existsSync(cssDir)) {
    const files = fs.readdirSync(cssDir);
    for (const file of files) {
      // Only process .css files, skip .min.css and purged-*.css
      if (
        file.endsWith('.css') &&
        !file.endsWith('.min.css') &&
        !file.startsWith('purged-')
      ) {
        await purgeAndReplace(path.join(cssDir, file));
      }
    }
  } else {
    console.warn(
      'Warning: dist/css directory does not exist. Skipping CSS purging.'
    );
  }
}
run();
