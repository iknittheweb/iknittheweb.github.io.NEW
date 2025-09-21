#!/usr/bin/env node

/*
  🔧 BUILD SCRIPT - Automatically updates URLs for different environments
  
  USAGE:
  - npm run dev     → Builds for development (GitHub Pages)
  - npm run deploy  → Builds for production (Custom Domain)
  
  📝 Remember to:
  1. Edit index.template.html (NOT index.html)
  2. Run npm run dev after making changes
  3. Run npm run deploy before pushing to production
  4. Update production baseUrl below when you get your custom domain
*/

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  development: {
    baseUrl: 'https://iknittheweb.github.io',
    assetUrl: '/src/img',
  },
  production: {
    baseUrl: 'https://yourdomain.com', // Update this to your custom domain
    assetUrl: 'https://yourdomain.com/src/img',
  },
};

// Get environment from command line argument or default to development
const env = process.argv[2] || 'development';
const envConfig = config[env];

if (!envConfig) {
  console.error(`Unknown environment: ${env}`);
  process.exit(1);
}

console.log(`Building for ${env} environment...`);

// Read the template HTML file
const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'index.html');

try {
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with environment-specific values
  htmlContent = htmlContent
    .replace(/{{BASE_URL}}/g, envConfig.baseUrl)
    .replace(/{{ASSET_URL}}/g, envConfig.assetUrl);

  // Write the processed HTML
  fs.writeFileSync(outputPath, htmlContent);

  console.log(`✅ Built ${outputPath} for ${env}`);
  console.log(`🌐 Base URL: ${envConfig.baseUrl}`);
  console.log(`🖼️ Asset URL: ${envConfig.assetUrl}`);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
