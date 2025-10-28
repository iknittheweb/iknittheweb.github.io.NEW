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
require('dotenv').config({
  path: process.env.DOTENV_CONFIG_PATH
    ? process.env.DOTENV_CONFIG_PATH
    : process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env',
});

const srcDir = path.join(__dirname, 'src', 'templates');
const outDir = __dirname;
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

    // Add a comment at the top reminding developers to check page-specific replacements
    html =
      `<!--\n  ⚠️ AUTO-GENERATED: Check page-specific placeholder replacements (TITLE, DESCRIPTION, KEYWORDS, OG_IMAGE, PAGE_NAME) before deploying!\n  Edit src/templates/${file} to set real values.\n--->\n` +
      html;

    // Remove template warning and workflow comments from the output
    html = html.replace(
      /<!--\s*IMPORTANT: This is a TEMPLATE file![\s\S]*?DO NOT edit the generated \*\.html file directly[\s\S]*?-->/g,
      ''
    );
    html = html.replace(/<!--\s*-{2,}\s*BEGINNER-FRIENDLY EXPLANATORY COMMENTS[\s\S]*?-{2,}\s*-->/g, '');
    html = html.replace(
      /<!--\s*Build System Workflow \(2025\):[\s\S]*?DO NOT edit the generated \*\.html file directly[\s\S]*?-->/g,
      ''
    );

    // Inject header and footer
    html = html.replace(/<!--\s*HEADER_PLACEHOLDER\s*-->/i, header);
    html = html.replace(/<!--\s*FOOTER_PLACEHOLDER\s*-->/i, footer);

    // Warn if unreplaced placeholders remain
    const unreplaced = html.match(/{{[A-Z0-9_]+}}/g);
    if (unreplaced && unreplaced.length > 0) {
      console.warn(`⚠️ Unreplaced placeholders found in ${file.replace('.template.html', '.html')}:`, unreplaced);
    }

    const outFile = path.join(outDir, file.replace('.template.html', '.html'));
    fs.writeFileSync(outFile, html);
    console.log(`Generated: ${outFile}`);
  }
});
