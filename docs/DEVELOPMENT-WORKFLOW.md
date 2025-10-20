# Complete Development Workflow Guide

## From Repository Creation to Live Deployment

This document outlines the complete workflow for developing and deploying this website, from initial setup to feature
implementation using modern Git practices.

## 🚦 Quick Start for New Developers

1. Clone the repository
2. Install dependencies:
   - npm install
3. Bulk build for local development:
   - npm run local (uses .env)
4. Bulk build for production:
   - npm run deploy (uses .env.production)
5. Bulk build for alternate environment:
   - npm run alt (uses .env.alt)
6. Bulk build process includes:
   - Generation of all HTML pages from all \*.template.html files in templates to pages using component-build.cjs.
   - Compilation of all SCSS entry points to .temp.css files using compile-e-pages-scss.cjs and sass.
   - Purging and minification of CSS using purge-and-minify.cjs to produce .purged.css and .purged.min.css files in css.
7. Edit templates: Always edit index.template.html and page templates in templates, not the generated HTML files.
8. For new pages: Add a new \*.template.html file in templates. The build system will automatically generate the
   corresponding .html file in pages during bulk build.
   - If page-specific placeholders (e.g., {{TITLE}}, {{DESCRIPTION}}, {{KEYWORDS}}, {{OG_IMAGE}}, {{PAGE_NAME}}) are not
     set in your template, the build system will insert generic defaults and a warning comment at the top of the
     generated HTML file.
   - Always check the top of your generated HTML files in dist/pages/ for the warning comment and update your template
     with real values before deploying.
9. _All CSS/SCSS compilation and purging is handled by npm scripts. No manual PowerShell or CLI needed._ ⚡ Individual
   File Build Process You can also build individual pages or stylesheets manually:

## Generate a single HTML page from a template

    node component-build.cjs src/templates/index.template.html

---

This will output your-page.html to pages.

## Compile a single SCSS file to temp CSS

    npx sass src/scss/styles.scss dist/css/styles.temp.css --style=expanded --source-map

---

## Purge and minify a single temp CSS file

    npx postcss dist/css/styles.temp.css -o dist/css/styles.purged.css --purgecss --map --purgecss-content "dist/pages/index.html"
    npx postcss dist/css/styles.purged.css -o dist/css/styles.purged.min.css --use cssnano --map

---

🛠️ Bulk Build Process (Recommended) Use the npm scripts in package.json for full automation:

- npm run local – Bulk build for local development (all pages and CSS)
- npm run deploy – Bulk build for production
- npm run alt – Bulk build for alternate environment

These scripts will:

1. Compile all SCSS entry points to .temp.css files
2. Generate all HTML pages from all templates
3. Purge and minify all CSS to .purged.css and .purged.min.css
4. Output all results to the dist folder

---

## 📚 Table of Contents

1. [Initial Repository Setup](#initial-repository-setup)
2. [Local Development Environment](#local-development-environment)
3. [Project Structure & Build System](#project-structure--build-system)
4. [Feature Development Workflow](#feature-development-workflow)
5. [Pull Request Process](#pull-request-process)
6. [Deployment to GitHub Pages](#deployment-to-github-pages)
7. [VS Code Extensions & Tools](#vs-code-extensions--tools)
8. [Common Commands Reference](#common-commands-reference)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Initial Repository Setup

### 1. Create GitHub Repository

```bash
# On GitHub.com:
# 1. Click "New repository"
# 2. Name: "your-username.github.io" (for user pages) or "project-name"
# 3. Set to Public (required for free GitHub Pages)
# 4. Initialize with README
# 5. Add .gitignore (Node if using build tools)
```

### 2. Clone Repository Locally

```bash
# Clone to your local machine
git clone https://github.com/username/repository-name.git
cd repository-name

# Verify connection
git remote -v
```

### 3. Initial Commit Structure

```bash
# Create basic project structure
mkdir src docs dist
touch index.html package.json README.md

# Add and commit initial structure
git add .
git commit -m "Initial project structure"
git push origin main
```

---

## 💻 Local Development Environment

### Required Tools

- **Git** - Version control
- **Node.js & npm** - Package management and build tools
- **VS Code** - Code editor with extensions
- **Web Browser** - Testing (Firefox recommended for debugging)

### Development Dependencies Setup

```bash
# Initialize npm project
npm init -y

# Install build tools
npm install --save-dev sass cross-env

# Install live server for local development (optional)
npm install --save-dev live-server
```

### Package.json Scripts

```json
{
  "scripts": {
    "build:local": "cross-env DOTENV_CONFIG_PATH=.env.local node build.cjs development && npx sass src/scss/E-pages/home/home.scss dist/home.css --style=expanded --source-map && npx sass src/scss/E-pages/home/home.scss dist/home.min.css --style=compressed --source-map && npx sass src/scss/E-pages/about/about.scss dist/about.css --style=expanded --source-map && npx sass src/scss/E-pages/about/about.scss dist/about.min.css --style=compressed --source-map && npx sass src/scss/E-pages/contact/contact.scss dist/contact.css --style=expanded --source-map && npx sass src/scss/E-pages/contact/contact.scss dist/contact.min.css --style=compressed --source-map && npx sass src/scss/E-pages/portfolio/portfolio.scss dist/portfolio.css --style=expanded --source-map && npx sass src/scss/E-pages/portfolio/portfolio.scss dist/portfolio.min.css --style=compressed --source-map && npx sass src/scss/E-pages/calculator/calculator.scss dist/calculator.css --style=expanded --source-map && npx sass src/scss/E-pages/calculator/calculator.scss dist/calculator.min.css --style=compressed --source-map && npx postcss dist/home.min.css -o dist/home.purged.min.css && npx postcss dist/about.min.css -o dist/about.purged.min.css && npx postcss dist/contact.min.css -o dist/contact.purged.min.css && npx postcss dist/portfolio.min.css -o dist/portfolio.purged.min.css && npx postcss dist/calculator.min.css -o dist/calculator.purged.min.css",
    "build:prod": "cross-env NODE_ENV=production node build.cjs production && npx sass src/scss/E-pages/home/home.scss dist/home.css --style=expanded --source-map && npx sass src/scss/E-pages/home/home.scss dist/home.min.css --style=compressed --source-map && npx sass src/scss/E-pages/about/about.scss dist/about.css --style=expanded --source-map && npx sass src/scss/E-pages/about/about.scss dist/about.min.css --style=compressed --source-map && npx sass src/scss/E-pages/contact/contact.scss dist/contact.css --style=expanded --source-map && npx sass src/scss/E-pages/contact/contact.scss dist/contact.min.css --style=compressed --source-map && npx sass src/scss/E-pages/portfolio/portfolio.scss dist/portfolio.css --style=expanded --source-map && npx sass src/scss/E-pages/portfolio/portfolio.scss dist/portfolio.min.css --style=compressed --source-map && npx sass src/scss/E-pages/calculator/calculator.scss dist/calculator.css --style=expanded --source-map && npx sass src/scss/E-pages/calculator/calculator.scss dist/calculator.min.css --style=compressed --source-map && npx postcss dist/home.min.css -o dist/home.purged.min.css && npx postcss dist/about.min.css -o dist/about.purged.min.css && npx postcss dist/contact.min.css -o dist/contact.purged.min.css && npx postcss dist/portfolio.min.css -o dist/portfolio.purged.min.css && npx postcss dist/calculator.min.css -o dist/calculator.purged.min.css",
    "local": "npm run build:local",
    "dev": "live-server --port=3000 --host=localhost",
    "watch": "npx sass --watch src/scss/styles.scss dist/styles.css --style=expanded"
  }
}
```

---

## 🏗️ Project Structure & Build System

### Recommended Folder Structure

```
project-root/
├── docs/                    # Documentation
├── src/                     # Source files
│   ├── css/                # Legacy CSS files
│   ├── js/                 # JavaScript files
│   ├── img/                # Images and assets
│   ├── pages/              # HTML page templates
│   └── scss/               # SCSS stylesheets
│       ├── A-abstracts/    # Variables, functions, mixins
│       ├── B-base/         # Base styles, resets
│       ├── C-components/   # UI components
│       ├── D-layout/       # Layout patterns
│       ├── E-pages/        # Page-specific styles
│       ├── F-themes/       # Theme variations
│       └── G-vendors/      # Third-party styles
├── dist/                   # Compiled/built files
├── index.html              # Main HTML file
├── index.template.html     # Template for build process
├── package.json            # Node.js dependencies
├── build.cjs               # Build script
└── .env.local             # Environment variables
```

### Build System Components

- **build.cjs** - Processes HTML templates with environment variables
- **SASS compilation** - Transforms SCSS to CSS
- **Environment configs** - Different settings for local vs production

---

## 🔄 Feature Development Workflow

### 1. Start New Feature

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feature/descriptive-name
# Examples: feature/contact-form, feature/responsive-design, feature/sparkle-animations
```

### 2. Develop Feature

```bash
# Make your changes to relevant files
# Test locally with:
npm run local
npm run dev  # (if using live-server)

# Build and test frequently:
npm run build:local
```

### 3. Commit Changes

```bash
# Stage specific files related to your feature
git add src/scss/C-components/_contact.scss
git add src/scss/C-components/_sparkle-animations.scss
git add index.template.html

# Commit with descriptive message
git commit -m "Add magical sparkle effects to contact submit button

- Implemented multiple sparkle animations with different timing
- Added shimmer effect on hover
- Positioned sparkles away from button text for clean design
- Fixed SASS breakpoint map syntax issues
- Added proper accessibility support with reduced motion"

# Push feature branch to GitHub
git push origin feature/descriptive-name
```

### 4. Testing Checklist

- [ ] Feature works as expected locally
- [ ] No console errors or warnings
- [ ] Responsive design works on different screen sizes
- [ ] Accessibility considerations (keyboard navigation, screen readers)
- [ ] Performance impact is minimal
- [ ] Code follows project conventions

---

## 🔀 Pull Request Process

### 1. Create Pull Request

**Via VS Code (Recommended):**

- Install "GitHub Pull Requests and Issues" extension
- Use GitHub tab in VS Code sidebar
- Click "Create Pull Request"

**Via GitHub.com:**

- Navigate to your repository
- Click yellow "Compare & pull request" banner
- Or use "Pull requests" → "New pull request"

### 2. Pull Request Template

```markdown
## 🎯 What This PR Does

Brief description of the feature or fix.

## ✨ Features Added / 🐛 Issues Fixed

- Bullet point list of changes
- Include user-facing improvements
- Note any breaking changes

## 🔧 Technical Changes

- List file changes and why
- Mention any new dependencies
- Note configuration changes

## 🧪 Testing

- How you tested the changes
- What browsers/devices tested
- Any edge cases considered

## 📸 Screenshots (if applicable)

Include before/after images for UI changes.
```

### 3. Review & Merge Process

```bash
# Self-review checklist:
# - Review all file changes in GitHub
# - Ensure no unrelated changes included
# - Check commit messages are clear
# - Verify branch only contains intended feature

# Merge options:
# - "Create merge commit" (default, preserves branch history)
# - "Squash and merge" (combines commits into one)
# - "Rebase and merge" (linear history, no merge commit)

# After merging:
git checkout main
git pull origin main
git branch -d feature/branch-name  # Delete local feature branch
```

---

## 🌐 Deployment to GitHub Pages

### Automatic Deployment Setup

1. **Repository Settings:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` (or `gh-pages`)
   - Folder: `/ (root)` or `/docs`

2. **Custom Domain (Optional):**
   - Add CNAME file with your domain
   - Configure DNS with your domain provider
   - Enable "Enforce HTTPS" in settings

### Manual Deployment Process

```bash
# Build for production
npm run build:prod

# Ensure all files are committed
git add .
git commit -m "Build for production deployment"
git push origin main

# GitHub Pages will automatically deploy from main branch
# Check deployment status in repository "Actions" tab
```

### Deployment Checklist

- [ ] All assets use relative paths
- [ ] Environment variables set correctly for production
- [ ] CSS and JS files are optimized/minified
- [ ] Images are optimized for web
- [ ] No hardcoded localhost URLs
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enforced
- [ ] 404 page exists

---

## 🔧 VS Code Extensions & Tools

### Essential Extensions

1. **GitHub Pull Requests and Issues** (`GitHub.vscode-pull-request-github`)
   - Manage PRs directly in VS Code
   - View GitHub issues and discussions

2. **Debugger for Firefox** (`firefox-devtools.vscode-firefox-debug`)
   - Debug JavaScript in Firefox from VS Code
   - Set breakpoints and inspect variables

3. **EditorConfig for VS Code** (`EditorConfig.EditorConfig`)
   - Maintain consistent coding styles
   - Automatic formatting rules

4. **Git History** (`donjayamanne.githistory`)
   - Visualize commit history
   - Compare file changes over time

### Helpful Extensions

- **Live Server** - Local development server
- **SCSS IntelliSense** - SCSS autocomplete and syntax
- **Prettier** - Code formatting
- **Auto Rename Tag** - HTML/XML tag synchronization
- **Bracket Pair Colorizer** - Visual bracket matching

### VS Code Settings for Web Development

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "scss.validate": true,
  "css.validate": true,
  "html.format.wrapLineLength": 80,
  "files.associations": {
    "*.scss": "scss"
  }
}
```

---

## 📖 Common Commands Reference

### Git Commands

```bash
# Branch Management
git branch                           # List local branches
git branch -r                        # List remote branches
git checkout -b feature/name         # Create and switch to new branch
git checkout main                    # Switch to main branch
git branch -d feature/name           # Delete local branch
git push origin --delete feature/name # Delete remote branch

# Staging and Committing
git status                           # Check working directory status
git add .                           # Stage all changes
git add file.txt                    # Stage specific file
git commit -m "message"             # Commit with message
git commit --amend                  # Modify last commit

# Remote Operations
git fetch origin                    # Download remote changes
git pull origin main                # Pull and merge remote main
git push origin branch-name         # Push branch to remote
git push --set-upstream origin branch # Set up tracking

# Stashing (temporary save)
git stash                          # Save uncommitted changes
git stash pop                      # Apply and remove latest stash
git stash list                     # View all stashes
git stash apply stash@{0}          # Apply specific stash

# History and Diffs
git log --oneline                  # Compact commit history
git diff                          # Show unstaged changes
git diff --staged                 # Show staged changes
git show commit-hash              # Show specific commit details
```

### Build Commands

```bash
# Development
npm run local                      # Build for local development
npm run dev                       # Start local development server
npm run watch                     # Watch SCSS files for changes

# Production
npm run build:prod               # Build optimized for production

# SASS/SCSS
npx sass src/scss/styles.scss dist/styles.css --style=expanded
npx sass --watch src/scss:dist --style=expanded
```

### Package Management

```bash
# Dependencies
npm install package-name          # Install package
npm install --save-dev package    # Install as dev dependency
npm uninstall package-name        # Remove package
npm update                        # Update all packages
npm audit                         # Check for security issues

# Project Info
npm list                          # Show installed packages
npm outdated                      # Show outdated packages
npm run                          # List available scripts
```

---

## 🚨 Troubleshooting

### Common Git Issues

**Problem: Merge conflicts**

```bash
# When conflicts occur during merge/rebase:
git status                        # See conflicted files
# Edit files to resolve conflicts (look for <<<< ==== >>>>)
git add resolved-file.txt         # Mark as resolved
git commit                        # Complete the merge
```

**Problem: Uncommitted changes blocking operations**

```bash
git stash                         # Temporarily save changes
# Perform git operation (checkout, merge, etc.)
git stash pop                     # Restore changes
```

**Problem: Need to undo last commit**

```bash
git reset --soft HEAD~1           # Undo commit, keep changes staged
git reset --hard HEAD~1           # Undo commit, discard changes (DANGEROUS)
```

### Build Issues

**Problem: SASS compilation errors**

```bash
# Check SCSS syntax:
npx sass --check src/scss/styles.scss

# Common issues:
# - Missing semicolons
# - Incorrect variable names ($variable)
# - Map syntax errors (trailing commas)
# - Import path issues (@use, @import)
```

**Problem: GitHub Pages not updating**

```bash
# Check deployment status:
# 1. Go to repository → Actions tab
# 2. Look for failed deployments
# 3. Check Settings → Pages for configuration

# Force refresh deployment:
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin main
```

**Problem: Local development server issues**

```bash
# Clear npm cache:
npm cache clean --force

# Reinstall dependencies:
rm -rf node_modules package-lock.json
npm install

# Check port conflicts:
netstat -tulpn | grep :3000  # Linux/Mac
netstat -an | findstr :3000  # Windows
```

### VS Code Issues

**Problem: Extensions not working**

- Reload VS Code window: Ctrl+Shift+P → "Developer: Reload Window"
- Check extension updates in Extensions panel
- Verify workspace trust settings

**Problem: Git authentication**

```bash
# Configure Git credentials:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# For GitHub authentication issues:
# Use VS Code command palette: "Git: Clone" and sign in through browser
```

---

## 🎯 Best Practices Summary

### Git Workflow

- Always work on feature branches, never directly on main
- Write descriptive commit messages explaining what and why
- Keep commits focused and atomic (one logical change per commit)
- Pull latest main before creating new branches
- Delete feature branches after merging

### Code Organization

- Follow consistent file naming conventions
- Use meaningful class names and IDs
- Comment complex CSS/SCSS code
- Optimize images and assets for web
- Test on multiple browsers and devices

### Documentation

- Keep README.md up to date
- Document complex features and setup processes
- Use meaningful pull request descriptions
- Comment unusual or complex code sections

### Security & Performance

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Optimize CSS and JavaScript for production
- Compress images and use appropriate formats
- Enable HTTPS for live sites

---

## 📅 Maintenance Schedule

### Daily

- [ ] Pull latest changes before starting work
- [ ] Commit changes with descriptive messages
- [ ] Test changes locally before pushing

### Weekly

- [ ] Review and merge completed pull requests
- [ ] Update dependencies (`npm update`)
- [ ] Check for security vulnerabilities (`npm audit`)
- [ ] Clean up merged feature branches

### Monthly

- [ ] Review and update documentation
- [ ] Audit and optimize performance
- [ ] Update VS Code extensions
- [ ] Review GitHub Pages analytics (if configured)
- [ ] Backup project and important files

---

_This workflow guide is a living document. Update it as your development process evolves and improves._
