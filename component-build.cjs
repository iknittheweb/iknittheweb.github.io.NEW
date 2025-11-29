#!/usr/bin/env node
// ------------------------------------------------------------
// COMPONENT-BUILD SCRIPT: Generates HTML pages from templates
// ------------------------------------------------------------
// This script processes all .template.html files in src/templates/
// and outputs .html files to the project root.
// It injects the header and footer from index.html and replaces
// environment variable placeholders (e.g., {{BASE_URL}}, {{ASSET_URL}}, etc).
// ------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
// Register 'eq' helper for conditional logic in templates
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Determine which .env file to use, matching build.cjs logic

const mode = process.argv[2] ? process.argv[2].toLowerCase() : '';
let dotenvPath = '.env';
if (process.env.DOTENV_CONFIG_PATH) {
  dotenvPath = process.env.DOTENV_CONFIG_PATH;
} else if (mode === 'alt') {
  dotenvPath = '.env.alt';
} else if (mode === 'netlify-alt') {
  dotenvPath = '.env.netlify-alt';
} else if (mode === 'prod' || mode === 'production') {
  dotenvPath = '.env.production';
}
console.log(`[component-build.cjs] Using dotenv path: ${dotenvPath}`);
require('dotenv').config({ path: dotenvPath });
console.log(`[component-build.cjs] BASE_URL: ${process.env.BASE_URL}`);

const srcDir = path.join(__dirname, 'src', 'templates');
const outDir = __dirname;
const indexTemplatePath = path.join(srcDir, 'index.template.html');
const indexHtmlPath = path.join(__dirname, 'index.html');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const headerMatch = indexHtml.match(/<header[\s\S]*?<\/header>/i);
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
const header = headerMatch ? headerMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';

fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith('.template.html')) {
    const templatePath = path.join(srcDir, file);
    const templateSrc = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSrc);

    // Build context: env vars + page-specific defaults
    const pageSpecific = {
      TITLE: 'Untitled Page',
      DESCRIPTION: 'No description provided. Please update before deploying.',
      KEYWORDS: 'web, page, update keywords',
      OG_IMAGE: '/src/img/pages/default-og-image.png',
      PAGE_NAME: file.replace('.template.html', ''),
    };
    const context = Object.assign({}, pageSpecific, process.env);

    let html = template(context);

    // Remove template warning and workflow comments from the output
    html = html.replace(
      /<!--\s*IMPORTANT: This is a TEMPLATE file![\s\S]*?DO NOT edit the generated \*\.html file directly[\s\S]*?-->/g,
      ''
    );
    html = html.replace(
      /<!--\s*-{2,}\s*BEGINNER-FRIENDLY EXPLANATORY COMMENTS[\s\S]*?-{2,}\s*-->/g,
      ''
    );

    // Inject header and footer
    html = html.replace(/<!--\s*HEADER_PLACEHOLDER\s*-->/i, header);
    html = html.replace(/<!--\s*FOOTER_PLACEHOLDER\s*-->/i, footer);

    // Warn if unreplaced placeholders remain
    const unreplaced = html.match(/{{[A-Z0-9_]+}}/g);
    if (unreplaced && unreplaced.length > 0) {
      console.warn(
        `⚠️ Unreplaced placeholders found in ${file.replace('.template.html', '.html')}:`,
        unreplaced
      );
    }

    const outFile = path.join(outDir, file.replace('.template.html', '.html'));
    fs.writeFileSync(outFile, html);
    console.log(`Generated: ${outFile}`);
  }
});
