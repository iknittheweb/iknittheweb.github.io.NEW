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
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'alt'
      ? '.env.alt'
      : '.env',
});

// Site-wide environment variables
// BASE_URL: Used for links and asset paths (e.g., '/')
// ASSET_URL: Used for referencing images, scripts, etc. (e.g., '/')
// CSS_FILE: Name of main CSS file (default: styles.purged.css)
const baseUrl = process.env.BASE_URL;
const assetUrl = process.env.ASSET_URL;
const cssFile = process.env.CSS_FILE || 'styles.purged.css';

// Array of page objects to build
// Each object describes:
//   - template: which template file to use (from src/templates/)
//   - output: what the output HTML file should be named
//   - data: site-wide variables to inject (page-specific variables must be filled in the template)
const pages = [
  {
    template: 'portfolio.template.html',
    output: 'portfolio.html',
    data: {
      TITLE: 'Full Portfolio | I Knit The Web',
      DESCRIPTION: 'Explore my complete portfolio of web development projects including featured applications, learning challenges, and UI experiments showcasing HTML, CSS, and JavaScript skills.',
      KEYWORDS: 'portfolio, web development, HTML, CSS, JavaScript, projects, frontend development, coding challenges, UI experiments',
      AUTHOR: 'I Knit The Web',
      CANONICAL_URL: 'https://iknittheweb.com/pages/portfolio.html',
      ROBOTS: 'index,follow',
      OG_TITLE: 'Full Portfolio | I Knit The Web - I Knit The Web',
      OG_DESCRIPTION: 'Explore my complete portfolio of web development projects including featured applications, learning challenges, and UI experiments showcasing HTML, CSS, and JavaScript skills.',
      OG_IMAGE: 'https://iknittheweb.com/src/img/branding/logo.png',
      OG_URL: 'https://iknittheweb.com/pages/portfolio.html',
      TWITTER_TITLE: 'Full Portfolio | I Knit The Web',
      TWITTER_DESCRIPTION: 'Explore my complete portfolio of web development projects including featured applications, learning challenges, and UI experiments showcasing HTML, CSS, and JavaScript skills.',
      TWITTER_IMAGE: 'https://iknittheweb.com/src/img/branding/logo.png',
      // Add more variables as needed for your template
    }
  },
  {
    template: 'example.template.html',
    output: 'example.html',
    data: {
  AUTHOR: 'I Knit The Web',
  CANONICAL_URL: 'https://iknittheweb.com/pages/example.html',
  ROBOTS: 'index,follow',
  FAVICON_URL: '/src/img/favicon_io/favicon.ico',
  GOOGLE_FONTS_LINK: 'https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap',
  // Site-wide variables only. Page-specific variables must be filled in the template before build.
    }
  }
];

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
function replaceTemplateVariables(content, data, envConfig) {
  let result = content;

  // Only replace global environment variables (e.g., {{BASE_URL}}, {{ASSET_URL}})
  result = result.replace(/{{BASE_URL}}/g, baseUrl);
  result = result.replace(/{{ASSET_URL}}/g, assetUrl);

  // Inject shared header/footer (from index.template.html)
  // If your template uses <div id="header-placeholder"></div>, it will be replaced with the actual header HTML
  // Same for footer
  const { headerHTML, footerHTML } = extractHeaderFooter();
  result = result.replace('<div id="header-placeholder"></div>', headerHTML);
  result = result.replace('<div id="footer-placeholder"></div>', footerHTML);

  // Return the final HTML string
  return result;
}

// Function to build all component-based pages from their templates
// - Reads each template file from src/templates/
// - Injects site-wide variables and header/footer
// - Writes the final HTML file to dist/pages/
function buildPagesFromTemplates(env = 'development') {
  const templatesDir = path.join(__dirname, 'src', 'templates'); // Where your templates live
  const outputDir = path.join(__dirname, 'dist', 'pages'); // Where generated HTML files go

  console.log('\n🧩 Building pages from templates with environment variables...');

  pages.forEach((page) => {
    try {
      const templatePath = path.join(templatesDir, page.template); // Full path to template file
      const outputPath = path.join(outputDir, page.output); // Full path to output HTML file

      // Check if the template file exists
      if (!fs.existsSync(templatePath)) {
        console.warn(`⚠️  Template not found: ${templatePath}`);
        return;
      }

      // Read the template file as a string
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      // Replace placeholders with actual data
      const processedContent = replaceTemplateVariables(templateContent, page.data);

      // Make sure the output directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Write the final HTML file
      fs.writeFileSync(outputPath, processedContent, 'utf8');
      console.log(`✅ Built ${page.output} from ${page.template}`);
    } catch (error) {
      // If something goes wrong, print an error message
      console.error(`❌ Error building ${page.output}:`, error.message);
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
