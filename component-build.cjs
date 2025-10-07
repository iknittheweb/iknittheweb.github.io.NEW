#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const baseUrl = process.env.BASE_URL;
const assetUrl = process.env.ASSET_URL;
const cssFile = process.env.CSS_FILE || 'styles.css';

const pages = [
  // ...existing code for all page objects, each separated by a comma and properly closed...
];

// Build functions
function replaceTemplateVariables(content, data, envConfig) {
  let result = content;

  // Replace page-specific variables
  Object.keys(data).forEach((key) => {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), data[key] || '');
  });

  // Replace environment variables
  result = result.replace(/{{BASE_URL}}/g, baseUrl);
  result = result.replace(/{{ASSET_URL}}/g, assetUrl);

  return result;
}

function buildPagesFromTemplates(env = 'development') {
  // env parameter is kept for compatibility, but environment is now determined by .env files
  const templatesDir = path.join(__dirname, 'src', 'templates');
  const outputDir = path.join(__dirname, 'src', 'pages');

  console.log('\n🧩 Building pages from templates with environment variables...');

  pages.forEach((page) => {
    try {
      const templatePath = path.join(templatesDir, page.template);
      const outputPath = path.join(outputDir, page.output);

      if (!fs.existsSync(templatePath)) {
        console.warn(`⚠️  Template not found: ${templatePath}`);
        return;
      }

      const templateContent = fs.readFileSync(templatePath, 'utf8');
      const processedContent = replaceTemplateVariables(templateContent, page.data);

      // Ensure output directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      fs.writeFileSync(outputPath, processedContent, 'utf8');
      console.log(`✅ Built ${page.output} from ${page.template}`);
    } catch (error) {
      console.error(`❌ Error building ${page.output}:`, error.message);
    }
  });
}

function buildMainTemplate(env = 'development') {
  const templatePath = path.join(__dirname, 'index.template.html');
  const outputPath = path.join(__dirname, 'index.html');

  // env parameter is kept for compatibility, but environment is now determined by .env files
  console.log('\n🏠 Building main template with environment variables...');

  try {
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template file not found: ${templatePath}`);
      return false;
    }

    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace template comments with generated file comments
    const templateComment = /<!--\s*🚨 TEMPLATE FILE[\s\S]*?-->\s*/;
    const generatedComment = `<!--
  🤖 GENERATED FILE - DO NOT EDIT DIRECTLY!
  
  This file was automatically generated from index.template.html
  Generated on: ${new Date().toISOString()}
  Environment: ${env}
  
  To make changes:
  1. Edit index.template.html (the source template)
  2. Run: npm run dev (for development/testing) 
  3. Run: npm run deploy (before pushing to production)
  
  This page uses JavaScript component injection for header/footer.
  Components are loaded from /src/js/components.js
-->
`;

    content = content.replace(templateComment, generatedComment);

    // Replace environment variables
    content = content.replace(/{{BASE_URL}}/g, baseUrl);
    content = content.replace(/{{ASSET_URL}}/g, assetUrl);

    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Built ${outputPath} for ${env}`);

    return true;
  } catch (error) {
    console.error('❌ Error building main template:', error.message);
    return false;
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const env = args[1] || 'development';

  // env parameter is kept for compatibility, but environment is now determined by .env files
  console.log('🔧 Component-based build system starting...');

  switch (command) {
  case 'pages':
    buildPagesFromTemplates(env);
    break;
  case 'main':
    buildMainTemplate(env);
    break;
  case 'all':
  default:
    const mainSuccess = buildMainTemplate(env);
    if (mainSuccess) {
      buildPagesFromTemplates(env);
    }
    break;
  }

  console.log(`\n🌐 Base URL: ${baseUrl}`);
  console.log(`🖼️ Asset URL: ${assetUrl}`);
  console.log('✨ Build complete!');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  buildPagesFromTemplates,
  buildMainTemplate,
};
