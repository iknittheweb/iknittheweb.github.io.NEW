#!/usr/bin/env node

// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This script is a custom static site generator for your project.
// It reads HTML template files, injects shared site-wide content (like header/footer),
// replaces placeholders with environment variables and page-specific data, and writes out final HTML files.
//
// Key concepts:
// - Templates: HTML files with placeholders (like {{TITLE}}) that get replaced during build.
// - Environment variables: Settings from .env files (like BASE_URL) used for asset paths, SEO, etc.
// - Header/Footer: Shared site-wide sections, automatically injected into every page.
// - Page objects: JavaScript objects describing which template to use, output filename, and what data to inject.
// - Output: Final HTML files are written to /dist/pages/ (except index.html, which goes to the project root).
//
// Usage:
//   node component-build.cjs all      // Build index.html and all component pages
//   node component-build.cjs main     // Build only index.html
//   node component-build.cjs pages    // Build only component pages
//
// ------------------------------------------------------------

// ------------------------------------------------------------
// COMPONENT-BASED BUILD SCRIPT
//
// This script generates static HTML pages from templates, injecting
// shared header/footer and environment variables for local and production.
//
// Usage:
//   node component-build.cjs [all|main|pages] [environment]
//   - all: builds main index.html and all component pages (default)
//   - main: builds only index.html
//   - pages: builds only component pages
//
// Environment variables are loaded from .env or .env.production
// ------------------------------------------------------------

const fs = require('fs'); // Node.js built-in module for reading/writing files
const path = require('path'); // Node.js built-in module for handling file and folder paths

// Load environment variables from .env files
// These variables control things like BASE_URL, ASSET_URL, etc.
//
// Supported environment files:
// - .env: Used for local development builds
// - .env.production: Used for production builds
// - .env.alt: (Optional) Used for alternate build environments (e.g., staging, testing)
//
// To use .env.alt, set NODE_ENV=alt before running the build script.
// Example: NODE_ENV=alt node component-build.cjs all
require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production' ? '.env.production' : process.env.NODE_ENV === 'alt' ? '.env.alt' : '.env',
});

// Site-wide environment variables
// BASE_URL: Used for links and asset paths (e.g., '/')
// ASSET_URL: Used for referencing images, scripts, etc. (e.g., '/')
// CSS_FILE: Name of main CSS file (default: styles.purged.css)
const baseUrl = process.env.BASE_URL;
const assetUrl = process.env.ASSET_URL;
const cssFile = process.env.CSS_FILE || 'styles.purged.css';

// No pages array needed! All page-specific data should be in the template files.

// Utility function: Extracts the shared <header> and <footer> from index.template.html
// These are injected into every generated page for consistency
function extractHeaderFooter() {
  const templatePath = path.join(__dirname, 'index.template.html');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  // Use regular expressions to find the first <header>...</header> and <footer>...</footer>
  const headerMatch = templateContent.match(/<header[\s\S]*?<\/header>/);
  const headerHTML = headerMatch ? headerMatch[0] : '';
  const footerMatch = templateContent.match(/<footer[\s\S]*?<\/footer>/);
  const footerHTML = footerMatch ? footerMatch[0] : '';
  return { headerHTML, footerHTML };
}

// Build functions
// Main function for replacing placeholders in templates
// - content: the template HTML as a string
// - data: site-wide variables to inject (from the page object)
// - envConfig: (not used, but kept for compatibility)
function replaceTemplateVariables(content) {
  let result = content;
  // Replace global environment variables
  result = result.replace(/{{BASE_URL}}/g, baseUrl);
  result = result.replace(/{{ASSET_URL}}/g, assetUrl);
  // Inject shared header/footer
  const { headerHTML, footerHTML } = extractHeaderFooter();
  result = result.replace('<div id="header-placeholder"></div>', headerHTML);
  result = result.replace('<div id="footer-placeholder"></div>', footerHTML);
  return result;
}

// Function to build all component-based pages from their templates
// - Reads each template file from src/templates/
// - Injects site-wide variables and header/footer
// - Writes the final HTML file to dist/pages/
function buildPagesFromTemplates(env = 'development') {
  const templatesDir = path.join(__dirname, 'src', 'templates');
  const outputDir = path.join(__dirname, 'dist', 'pages');

  console.log('\n🧩 Building pages from templates with global environment variables...');

  // Read all .template.html files in src/templates/
  const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.template.html'));

  // Also process index.template.html in the project root
  const mainTemplatePath = path.join(__dirname, 'index.template.html');
  if (fs.existsSync(mainTemplatePath)) {
    try {
      const mainContent = fs.readFileSync(mainTemplatePath, 'utf8');
      const processedMain = replaceTemplateVariables(mainContent);
      const outputMainPath = path.join(__dirname, 'index.html');
      fs.writeFileSync(outputMainPath, processedMain, 'utf8');
      console.log(`✅ Built index.html from index.template.html`);
    } catch (error) {
      console.error(`❌ Error building index.template.html:`, error.message);
    }
  }

  templateFiles.forEach(templateFile => {
    try {
      const templatePath = path.join(templatesDir, templateFile);
      const outputFile = templateFile.replace('.template.html', '.html');
      const outputPath = path.join(outputDir, outputFile);

      // Read the template file
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      // Replace global variables and inject header/footer
      const processedContent = replaceTemplateVariables(templateContent);

      // Ensure output directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Write the final HTML file
      fs.writeFileSync(outputPath, processedContent, 'utf8');
      console.log(`✅ Built ${outputFile} from ${templateFile}`);
    } catch (error) {
      console.error(`❌ Error building ${templateFile}:`, error.message);
    }
  });
}

// Function to build the main index.html from index.template.html
// - Reads index.template.html
// - Replaces environment variables (BASE_URL, ASSET_URL)
// - Writes index.html to the project root
function buildMainTemplate(env = 'development') {
  const templatePath = path.join(__dirname, 'index.template.html'); // Path to main template
  const outputPath = path.join(__dirname, 'index.html'); // Output index.html to project root

  console.log('\n🏠 Building main template with environment variables...');

  try {
    // Check if the template file exists
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template file not found: ${templatePath}`);
      return false;
    }

    // Read the template file as a string
    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace the template comment with a generated file warning
    const templateComment = /<!--\s*🚨 TEMPLATE FILE[\s\S]*?-->/;
    const generatedComment = `<!--
  🤖 GENERATED FILE - DO NOT EDIT DIRECTLY!

  This file was automatically generated from index.template.html
  Generated on: ${new Date().toISOString()}
  Environment: ${env}

  To make changes:
  1. Edit index.template.html (the source template)
  2. Run: npm run dev (for development/testing)
  3. Run: npm run deploy (before pushing to production)

  This page uses static header/footer injection via the build system.
  Header and footer are injected from component-build.cjs.
-->
`;
    content = content.replace(templateComment, generatedComment);

    // Replace environment variables
    content = content.replace(/{{BASE_URL}}/g, baseUrl);
    content = content.replace(/{{ASSET_URL}}/g, assetUrl);

    // Write the final index.html file
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Built ${outputPath} for ${env}`);

    return true;
  } catch (error) {
    // If something goes wrong, print an error message
    console.error('❌ Error building main template:', error.message);
    return false;
  }
}

// Main execution
// Main entry point for the build script
// - Parses command-line arguments
// - Runs the appropriate build function(s)
function main() {
  const args = process.argv.slice(2); // Get command-line arguments
  const command = args[0]; // Build command (all, main, pages)
  const env = args[1] || 'development'; // Environment (default: development)

  console.log('🔧 Component-based build system starting...');

  switch (command) {
    case 'pages':
      buildPagesFromTemplates(env); // Build only component pages
      break;
    case 'main':
      buildMainTemplate(env); // Build only main index.html
      break;
    case 'all':
    default:
      // Build main index.html first, then component pages
      const mainSuccess = buildMainTemplate(env);
      if (mainSuccess) {
        buildPagesFromTemplates(env);
      }
      break;
  }

  // Print a summary of the build
  console.log(`\n🌐 Base URL: ${baseUrl}`);
  console.log(`🖼️ Asset URL: ${assetUrl}`);
  console.log('✨ Build complete!');
}

// Run if called directly
// If this script is run directly (not imported), start the build
if (require.main === module) {
  main();
}

module.exports = {
  buildPagesFromTemplates,
  buildMainTemplate,
};
