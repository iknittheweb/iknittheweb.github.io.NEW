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

// This function does the purging and prettifying for one CSS file.
function purgeAndMinify(file) {
  // Get the "base name" of the CSS file (e.g., "portfolio" from "portfolio.css").
  // This helps us find the matching HTML file and name the output file.
  let base = file.endsWith('.min.css') ? path.basename(file, '.min.css') : path.basename(file, '.css');
  // Determine output extension
  let outExt = file.endsWith('.min.css') ? '.purged.min.css' : '.purged.css';
  // Build the path for the new purged CSS file (e.g., "portfolio.purged.css" or "portfolio.purged.min.css").
  const purged = path.join(cssDir, `${base}${outExt}`);

  // Build the path for the HTML file that matches this CSS file (e.g., "portfolio.html").
  const htmlFile = path.join(__dirname, 'dist', 'pages', `${base}.html`);

  // Create a temporary config file for PostCSS and PurgeCSS to use.
  // This config tells PurgeCSS to only look at the matching HTML file for used selectors.
  const tempConfigPath = path.join(__dirname, `postcss.config.${base}.purged.cjs`);

  // The configContent string is the actual config file contents.
  // It sets up PurgeCSS to scan the HTML and keep only the selectors it finds there.
  // The safelist is for any classes you want to keep, even if they're not in the HTML (maybe added by JS).
  // The defaultExtractor is a function that tells PurgeCSS how to find selectors in your HTML.
  const configContent = `const purgecss = require('@fullhuman/postcss-purgecss').default;\nconst prettify = require('postcss-prettify');\nmodule.exports = {\n  plugins: [\n    purgecss({\n      content: ['${htmlFile.replace(/\\/g, '/')}'],\n      safelist: ['header-hidden', 'show', 'skills-chart__tab--active', 'skills-chart__category--active'],\n      defaultExtractor: content => content.match(/[\\w-/:]+(?<!:)/g) || [],\n    }),\n    prettify({ expand: true }),\n  ],\n};\n`;

  // Write the config file to disk so PostCSS can use it.
  fs.writeFileSync(tempConfigPath, configContent);

  // Run PostCSS using this config file. This does the purging and prettifying.
  // "execSync" runs PostCSS just like you would in the terminal.
  // "--map" creates a source map for easier debugging.
  execSync(`npx postcss "${file}" -o "${purged}" --map --config ${tempConfigPath}`, { stdio: 'inherit' });

  // After we're done, delete the temporary config file to keep things tidy.
  fs.unlinkSync(tempConfigPath);

  // Now you have a purged, readable CSS file for this page!
}

// Now let's process every CSS file in the "dist/css" folder.
fs.readdirSync(cssDir).forEach(file => {
  // Only process .css and .min.css files, skip already purged/minified files
  if (
    (file.endsWith('.css') || file.endsWith('.min.css')) &&
    !file.endsWith('.purged.css') &&
    !file.endsWith('.purged.min.css')
  ) {
    // For each file that matches, run our purge and prettify function.
    purgeAndMinify(path.join(cssDir, file));
  }
});
