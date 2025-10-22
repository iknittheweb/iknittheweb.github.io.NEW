<!-- ^ # Onboarding & Project Overview

<!-- ~ This guide will help new developers get started quickly and understand the key workflows, conventions, and structure of this project.
<!-- ~ Docs and planning notes are in docs/ and notes/.
<!-- ~ Build commands:
<!-- ~ Testing & Quality:

<!-- ## 💻 Local Development Environment

<!-- Colorful Comment Key:
<!-- ^ Major section or workflow step (purple)
<!-- ~ Actionable step, command, or checklist (blue)
<!-- ^ ⚡ Individual File Build Process

<!-- ~ You can also build individual pages or stylesheets manually:

<!-- ~ Generate a single HTML page from a template
<!--    * node component-build.cjs src/templates/index.template.html
<!-- ~ Compile a single SCSS file to temp CSS
<!--    * npx sass src/scss/styles.scss dist/css/styles.temp.css --style=expanded --source-map

<!-- ~ Purge and minify a single temp CSS file
<!--    * npx postcss dist/css/styles.temp.css -o dist/css/styles.purged.css --purgecss --map --purgecss-content "dist/index.html"
<!-- ^ 🛠️ Bulk Build Process (Recommended)

<!-- ~ Use the npm scripts in package.json for full automation:
<!--    * npm run local – Bulk build for local development (all pages and CSS)

<!-- ~ These scripts will:
<!--    ~ 1. Compile all SCSS entry points to .temp.css files
<!--    ~ 2. Generate all HTML pages from all templates

<!-- ^ 📚 Table of Contents

<!-- ~ 1. [Initial Repository Setup](#initial-repository-setup)
<!--    * Initialize npm project
<!--      - npm init -y
<!--   * Install build tools
<!--    @ See package.json for full script details
<!-- ^ 🏗️ Project Structure & Build System
<!--          - css/               # Legacy CSS files
<!--          - js/                # JavaScript files
<!--             - F-themes/       # Theme variations
<!--       - git checkout main
<!--       - git pull origin main
<!--    * Test locally with:
<!--    * Build and test frequently:
<!--       - npm run build:local
<!--    * Stage specific files related to your feature
<!--       - git add src/scss/C-components/_contact.scss

<!-- ^ 🔀 Pull Request Process

<!-- ## 🔄 Feature Development Workflow -->

<!-- ### 1. Start New Feature -->

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feature/descriptive-name
# Examples: feature/contact-form, feature/responsive-design, feature/sparkle-animations
```

<!-- ### 2. Develop Feature -->

```bash
# Make your changes to relevant files
# Test locally with:
npm run local
npm run dev  # (if using live-server)

# Build and test frequently:
<!--    * Git History (`donjayamanne.githistory`)
```

<!-- ### 3. Commit Changes -->

```bash
# Stage specific files related to your feature
git add src/scss/C-components/_contact.scss
git add src/scss/C-components/_sparkle-animations.scss
git add index.template.html

# Commit with descriptive message


- Implemented multiple sparkle animations with different timing
- Added shimmer effect on hover
- Positioned sparkles away from button text for clean design
- Fixed SASS breakpoint map syntax issues
- Added proper accessibility support with reduced motion"

# Push feature branch to GitHub
<!-- ~ Helpful Extensions
```

<!-- ### 4. Testing Checklist -->

<!-- - [ ] Feature works as expected locally -->
<!-- - [ ] No console errors or warnings -->
<!-- - [ ] Responsive design works on different screen sizes -->
<!-- - [ ] Accessibility considerations (keyboard navigation, screen readers) -->
<!-- - [ ] Performance impact is minimal -->
<!-- - [ ] Code follows project conventions -->

<!-- ---- -->

<!-- ## 🔀 Pull Request Process -->

<!-- ### 1. Create Pull Request -->

<!-- **Via VS Code (Recommended):** -->

<!-- - Install "GitHub Pull Requests and Issues" extension -->
<!-- - Use GitHub tab in VS Code sidebar -->
<!-- - Click "Create Pull Request" -->

<!-- **Via GitHub.com:** -->

<!-- - Navigate to your repository -->
<!-- - Click yellow "Compare & pull request" banner -->
<!-- - Or use "Pull requests" → "New pull request" -->

<!-- ### 2. Pull Request Template -->

`````markdown
## 🎯 What This PR Does

Brief description of the feature or fix.

# - Verify branch only contains intended feature

<!--    - Source: "Deploy from a branch" -->

"html.format.wrapLineLength": 80, "files.associations": { "\*.scss": "scss"

# Remote Operations

<!--       - git branch -d feature/name           # Delete local branch
<!--       - git push origin --delete feature/name # Delete remote branch

<!-- **Problem: Need to undo last commit** -->

````bash
<!--       - git stash apply stash@{0}          # Apply specific stash
<!--    * History and Diffs
<!-- ### Build Issues -->

<!-- **Problem: SASS compilation errors** -->

```bash

# Common issues:
# - Missing semicolons
# - Incorrect variable names ($variable)
````
`````

````

<!-- **Problem: GitHub Pages not updating** -->

# 1. Go to repository → Actions tab

# 2. Look for failed deployments

# 3. Check Settings → Pages for configuration

<!-- - Write descriptive commit messages explaining what and why -->
<!-- - Keep commits focused and atomic (one logical change per commit) -->
<!-- - Follow consistent file naming conventions -->
<!-- - Comment complex CSS/SCSS code -->
<!-- - Keep README.md up to date -->
<!-- - Document complex features and setup processes -->
<!-- - Compress images and use appropriate formats -->
<!-- - [ ] Clean up merged feature branches -->

<!-- - [ ] Backup project and important files -->

<!-- _This workflow guide is a living document. Update it as your development process evolves and improves._ -->
<!--    * SASS/SCSS
<!--       - npx sass src/scss/styles.scss dist/styles.css --style=expanded
<!-- ^ 🚨 Troubleshooting


<!-- ### Build System Components -->

<!-- - **build.cjs** - Processes HTML templates with environment variables -->
<!-- - **SASS compilation** - Transforms SCSS to CSS -->
<!-- - **Environment configs** - Different settings for local vs production -->

<!-- ---- -->

<!-- ## 🔄 Feature Development Workflow -->

<!-- ### 1. Start New Feature -->

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feature/descriptive-name
# Examples: feature/contact-form, feature/responsive-design, feature/sparkle-animations
```

<!-- ### 2. Develop Feature -->

```bash
# Make your changes to relevant files
# Test locally with:
npm run local
npm run dev  # (if using live-server)

# Build and test frequently:
<!--    * Comment unusual or complex code sections
```

<!-- ### 3. Commit Changes -->

```bash
# Stage specific files related to your feature
git add src/scss/C-components/_contact.scss
git add src/scss/C-components/_sparkle-animations.scss
git add index.template.html

# Commit with descriptive message


- Implemented multiple sparkle animations with different timing
- Added shimmer effect on hover
- Positioned sparkles away from button text for clean design
- Fixed SASS breakpoint map syntax issues
- Added proper accessibility support with reduced motion"

# Push feature branch to GitHub
<!-- ~ Security & Performance
```

<!-- ### 4. Testing Checklist -->

<!-- - [ ] Feature works as expected locally -->
<!-- - [ ] No console errors or warnings -->
<!-- - [ ] Responsive design works on different screen sizes -->
<!-- - [ ] Accessibility considerations (keyboard navigation, screen readers) -->
<!-- - [ ] Performance impact is minimal -->
<!-- - [ ] Code follows project conventions -->

<!-- ---- -->

<!-- ## 🔀 Pull Request Process -->

<!-- ### 1. Create Pull Request -->

<!-- **Via VS Code (Recommended):** -->

<!-- - Install "GitHub Pull Requests and Issues" extension -->
<!-- - Use GitHub tab in VS Code sidebar -->
<!-- - Click "Create Pull Request" -->

<!-- **Via GitHub.com:** -->

<!-- - Navigate to your repository -->
<!-- - Click yellow "Compare & pull request" banner -->
<!-- - Or use "Pull requests" → "New pull request" -->

<!-- ### 2. Pull Request Template -->

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

<!-- ### 3. Review & Merge Process -->

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
<!--    * Never commit sensitive information (API keys, passwords)
<!--    * Use environment variables for configuration
<!--    * Optimize CSS and JavaScript for production
```

<!-- ---- -->

<!-- ## 🌐 Deployment to GitHub Pages -->

<!-- ### Automatic Deployment Setup -->

<!-- 1. **Repository Settings:** -->
<!--    - Go to repository Settings → Pages -->
<!--    - Source: "Deploy from a branch" -->
<!--    - Branch: `main` (or `gh-pages`) -->
<!--    - Folder: `/ (root)` or `/docs` -->

<!-- 2. **Custom Domain (Optional):** -->
<!--    - Add CNAME file with your domain -->
<!--    - Configure DNS with your domain provider -->
<!--    - Enable "Enforce HTTPS" in settings -->

<!-- ### Manual Deployment Process -->

```bash
# Build for production
npm run build:prod

# Ensure all files are committed
<!--    * Compress images and use appropriate formats
<!--    * Enable HTTPS for live sites


# GitHub Pages will automatically deploy from main branch
# Check deployment status in repository "Actions" tab
```

<!-- ### Deployment Checklist -->

<!-- - [ ] All assets use relative paths -->
<!-- - [ ] Environment variables set correctly for production -->
<!-- - [ ] CSS and JS files are optimized/minified -->
<!-- - [ ] Images are optimized for web -->
<!-- - [ ] No hardcoded localhost URLs -->
<!-- - [ ] Custom domain configured (if applicable) -->
<!-- - [ ] HTTPS enforced -->
<!-- - [ ] 404 page exists -->

<!-- ---- -->

<!-- ## 🔧 VS Code Extensions & Tools -->

<!-- ### Essential Extensions -->

<!-- 1. **GitHub Pull Requests and Issues** (`GitHub.vscode-pull-request-github`) -->
<!--    - Manage PRs directly in VS Code -->
<!--    - View GitHub issues and discussions -->

<!-- 2. **Debugger for Firefox** (`firefox-devtools.vscode-firefox-debug`) -->
<!--    - Debug JavaScript in Firefox from VS Code -->
<!--    - Set breakpoints and inspect variables -->

<!-- 3. **EditorConfig for VS Code** (`EditorConfig.EditorConfig`) -->
<!--    - Maintain consistent coding styles -->
<!--    - Automatic formatting rules -->

<!-- 4. **Git History** (`donjayamanne.githistory`) -->
<!--    - Visualize commit history -->
<!--    - Compare file changes over time -->

<!-- ### Helpful Extensions -->

<!-- - **Live Server** - Local development server -->
<!-- - **SCSS IntelliSense** - SCSS autocomplete and syntax -->
<!-- - **Prettier** - Code formatting -->
<!-- - **Auto Rename Tag** - HTML/XML tag synchronization -->
<!-- - **Bracket Pair Colorizer** - Visual bracket matching -->

<!-- ### VS Code Settings for Web Development -->

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

<!-- ---- -->

<!-- ## 📖 Common Commands Reference -->

<!-- ### Git Commands -->

```bash
# Branch Management
<!-- ^ 📅 Maintenance Schedule

<!-- ~ Daily
<!--    * Pull latest changes before starting work
<!--    * Commit changes with descriptive messages
<!--    * Test changes locally before pushing

# Staging and Committing

<!-- ~ Weekly
<!--    * Review and merge completed pull requests
<!--    * Update dependencies (`npm update`)
<!--    * Check for security vulnerabilities (`npm audit`)

# Remote Operations
<!--    * Clean up merged feature branches

<!-- ~ Monthly
<!--    * Review and update documentation

# Stashing (temporary save)
<!--    * Audit and optimize performance
<!--    * Update VS Code extensions
<!--    * Review GitHub Pages analytics (if configured)
<!--    * Backup project and important files

# History and Diffs

<!-- % _This workflow guide is a living document. Update it as your development process evolves and improves._

================================================================================
```

<!-- ### Build Commands -->

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

<!-- ### Package Management -->

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

<!-- ---- -->

<!-- ## 🚨 Troubleshooting -->

<!-- ### Common Git Issues -->

<!-- **Problem: Merge conflicts** -->

```bash
# When conflicts occur during merge/rebase:
Colorful Comment Key:
# Edit files to resolve conflicts (look for <<<< ==== >>>>)
^ Major section or workflow step (purple)
~ Actionable step, command, or checklist (blue)
```

<!-- **Problem: Uncommitted changes blocking operations** -->

```bash
@ Environment/config/placeholder detail (orange)
# Perform git operation (checkout, merge, etc.)
% Tip, warning, or special note (red)
```

<!-- **Problem: Need to undo last commit** -->

```bash
* List, option, or sub-step (green)
✔ Recommendation, best practice, improvement (teal)
```

<!-- ### Build Issues -->

<!-- **Problem: SASS compilation errors** -->

```bash
# Check SCSS syntax:
- Bullet point or file list (gray)

# Common issues:
# - Missing semicolons
# - Incorrect variable names ($variable)
# - Map syntax errors (trailing commas)
# - Import path issues (@use, @import)
```

<!-- **Problem: GitHub Pages not updating** -->

```bash
# Check deployment status:
# 1. Go to repository → Actions tab
# 2. Look for failed deployments
# 3. Check Settings → Pages for configuration

# Force refresh deployment:
, Subtask or nested detail (yellow)
================================================================================
```

<!-- **Problem: Local development server issues** -->

```bash
# Clear npm cache:
├── build.cjs               # Build script

# Reinstall dependencies:
└── .env.local             # Environment variables
```

# Check port conflicts:

### Build System Components

````

<!-- ### VS Code Issues -->

<!-- **Problem: Extensions not working** -->

<!-- - Reload VS Code window: Ctrl+Shift+P → "Developer: Reload Window" -->
<!-- - Check extension updates in Extensions panel -->
<!-- - Verify workspace trust settings -->

<!-- **Problem: Git authentication** -->

```bash
# Configure Git credentials:

- **build.cjs** - Processes HTML templates with environment variables

# For GitHub authentication issues:
# Use VS Code command palette: "Git: Clone" and sign in through browser
```

<!-- ---- -->

<!-- ## 🎯 Best Practices Summary -->

<!-- ### Git Workflow -->

<!-- - Always work on feature branches, never directly on main -->
<!-- - Write descriptive commit messages explaining what and why -->
<!-- - Keep commits focused and atomic (one logical change per commit) -->
<!-- - Pull latest main before creating new branches -->
<!-- - Delete feature branches after merging -->

<!-- ### Code Organization -->

<!-- - Follow consistent file naming conventions -->
<!-- - Use meaningful class names and IDs -->
<!-- - Comment complex CSS/SCSS code -->
<!-- - Optimize images and assets for web -->
<!-- - Test on multiple browsers and devices -->

<!-- ### Documentation -->

<!-- - Keep README.md up to date -->
<!-- - Document complex features and setup processes -->
<!-- - Use meaningful pull request descriptions -->
<!-- - Comment unusual or complex code sections -->

<!-- ### Security & Performance -->

<!-- - Never commit sensitive information (API keys, passwords) -->
<!-- - Use environment variables for configuration -->
<!-- - Optimize CSS and JavaScript for production -->
<!-- - Compress images and use appropriate formats -->
<!-- - Enable HTTPS for live sites -->

<!-- ---- -->

<!-- ## 📅 Maintenance Schedule -->

<!-- ### Daily -->

<!-- - [ ] Pull latest changes before starting work -->
<!-- - [ ] Commit changes with descriptive messages -->
<!-- - [ ] Test changes locally before pushing -->

<!-- ### Weekly -->

<!-- - [ ] Review and merge completed pull requests -->
<!-- - [ ] Update dependencies (`npm update`) -->
<!-- - [ ] Check for security vulnerabilities (`npm audit`) -->
<!-- - [ ] Clean up merged feature branches -->

<!-- ### Monthly -->

<!-- - [ ] Review and update documentation -->
<!-- - [ ] Audit and optimize performance -->
<!-- - [ ] Update VS Code extensions -->
<!-- - [ ] Review GitHub Pages analytics (if configured) -->
<!-- - [ ] Backup project and important files -->

<!-- ---- -->

<!-- _This workflow guide is a living document. Update it as your development process evolves and improves._ -->

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
