#!/usr/bin/env node
// ------------------------------------------------------------
// COMPONENT-BUILD SCRIPT: Generates HTML pages from templates
// ------------------------------------------------------------
// This script processes all .template.html files in src/templates/
// and outputs .html files to dist/pages/.
// It injects the header and footer from index.html and replaces
// environment variable placeholders (e.g., {{BASE_URL}}, {{ASSET_URL}}, etc).
// ------------------------------------------------------------

const fs = require('fs');
const path = require('path');
require('dotenv').config({
  path: process.env.DOTENV_CONFIG_PATH || (process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
});

const srcDir = path.join(__dirname, 'src', 'templates');
const outDir = path.join(__dirname, 'dist', 'pages');
const indexHtmlPath = path.join(__dirname, 'index.html');

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Read header and footer from index.html
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const headerMatch = indexHtml.match(/<header[\s\S]*?<\/header>/i);
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
const header = headerMatch ? headerMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';

// Get all environment variables to replace
const envVars = Object.keys(process.env);

// Process each template
fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith('.template.html')) {
    const templatePath = path.join(srcDir, file);
    let html = fs.readFileSync(templatePath, 'utf8');

    // Replace environment variable placeholders
    envVars.forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, process.env[key]);
    });

    // Replace page-specific placeholders with generated content if not set
    const pageSpecific = {
      TITLE: 'Untitled Page',
      DESCRIPTION: 'No description provided. Please update before deploying.',
      KEYWORDS: 'web, page, update keywords',
      OG_IMAGE: '/src/img/pages/default-og-image.png',
      PAGE_NAME: file.replace('.template.html', ''),
    };
    Object.entries(pageSpecific).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, value);
    });

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

    // Output file name (remove .template)
    const outFile = path.join(outDir, file.replace('.template.html', '.html'));
    fs.writeFileSync(outFile, html);
    console.log(`Generated: ${outFile}`);
  }
});
