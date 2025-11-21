// sync-env-sections.cjs
// Ensures every .env* file has a section for each page template

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 1. Find all template files (including index.template.html)
const templateFiles = glob
  .sync(path.join(__dirname, '*.template.html'))
  .concat(
    glob.sync(path.join(__dirname, 'src', 'templates', '*.template.html'))
  );

// 2. Get all .env* files in the project root
const envFiles = glob.sync(path.join(__dirname, '.env*'));

// 3. Extract page keys from template filenames
function getPageKey(filename) {
  const base = path.basename(filename);
  if (base === 'index.template.html') return 'HOME';
  return base.replace('.template.html', '').replace(/\./g, '-').toUpperCase();
}

// 4. Template for a new section
function sectionTemplate(pageKey) {
  return `\n# ${pageKey.toLowerCase().replace(/-/g, ' ')}\n${pageKey}_BREADCRUMB_CATEGORY_URL=\n${pageKey}_BREADCRUMB_CATEGORY=\n${pageKey}_CSS_FILE=\n${pageKey}_DESCRIPTION=\n${pageKey}_KEYWORDS=\n${pageKey}_NAV_CONFIG=\n${pageKey}_OG_DESCRIPTION=\n${pageKey}_OG_TITLE=\n${pageKey}_OG_URL=\n${pageKey}_PAGE_NAME=\n${pageKey}_SCHEMA_JSON=\n${pageKey}_SUBTITLE=\n${pageKey}_TITLE=\n${pageKey}_TWITTER_DESCRIPTION=\n${pageKey}_TWITTER_TITLE=\n`;
}

// 5. For each env file, ensure all sections exist
for (const envPath of envFiles) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  let updated = false;
  for (const templatePath of templateFiles) {
    const pageKey = getPageKey(templatePath);
    const regex = new RegExp(`(^|\n)${pageKey}_BREADCRUMB_CATEGORY_URL=`, 'i');
    if (!regex.test(envContent)) {
      envContent += sectionTemplate(pageKey);
      updated = true;
    }
  }
  if (updated) {
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log(`Updated ${envPath} with missing page sections.`);
  }
}
