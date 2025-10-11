# 🧩 Component System Guide

## Overview

This project uses two different systems for managing pages:

1. **Template-based Pages** (`index.template.html` and templates in `src/templates/`) - Built via `build.cjs` and
   `component-build.cjs`.
2. **Component-based Pages** - Use `components.js` for header/footer injection and are generated via
   `component-build.cjs`.

## ✨ Component-Based Page System

### How It Works

Component-based pages use JavaScript injection for consistent headers/footers:

- `components.js` - Contains header/footer templates and injection logic
- `<div id="header-placeholder"></div>` - Where header gets injected
- `<div id="footer-placeholder"></div>` - Where footer gets injected

**To migrate or add a new component-based page:**

1. Create a new template in `src/templates/`.
2. Add a page entry to the `pages` array in `component-build.cjs`.
3. Run `npm run local`, `npm run deploy`, or `npm run alt` to build and test.
4. For header/footer changes, update `components.js` and rebuild.

### Page Identification

Component-based pages have this comment (for easy identification):

```html
<!--
🚨 COMPONENT-BASED PAGE
------------------------
This page uses the component injection system (components.js) for header/footer.
If you need to update the template structure:
1. Edit: src/pages/templates/page-template.html
2. Run: node component-build.cjs
3. Test all component-based pages

For content-only changes, edit this file directly.

---

## 🧑‍💻 Onboarding for New Developers

- All page generation and migration is handled by the build scripts and templates.
- Never edit generated HTML files directly—always update templates and run the appropriate npm script.
- See DEVELOPMENT-WORKFLOW.md for a step-by-step guide.
-->
```

## 🏗️ Architecture

### Before (Current)

```
📁 pages/
  ├── calculator.html (full header/footer HTML)
  ├── portfolio.html (full header/footer HTML)
  ├── about.html (full header/footer HTML)
  └── ... (each page duplicates header/footer)
```

### After (Component-Based)

```
📁 src/
  ├── js/
  │   └── components.js (header/footer templates)
  ├── templates/
  │   ├── page-template.html (base template)
  │   └── calculator-example.html (example conversion)
  └── pages/
      └── ... (generated from templates)
```

## 🚀 Implementation Steps

### Step 1: Add Component System

**Files Added:**

- `src/js/components.js` - Universal header/footer components
- `src/templates/page-template.html` - Base page template
- `component-build.js` - Enhanced build system

### Step 2: Update Build Process

**NPM Commands:**

```bash
npm run build:components  # Generate component-based pages from templates
  npm run local            # Build all pages for local development (purged CSS)
  npm run deploy           # Build all pages for production (purged CSS)
```

**When to use each command:**

- **`npm run build:components`** - After editing component templates or creating new component-based pages
- **`npm run dev`** - After editing `index.template.html` for development
- **`npm run deploy`** - Before going live (builds production version of template-based pages)

### Step 3: Page Migration Process

**Convert existing page (e.g., calculator.html):**

1. **Current Structure:**

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    <header class="header-flex">
      <!-- 50+ lines of header HTML -->
    </header>
    <main>
      <!-- Page content -->
    </main>
    <footer>
      <!-- Footer HTML -->
    </footer>
  </body>
</html>
```

2. **New Structure:**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Page-specific data -->
    <div
      id="page-data"
      data-page-title="Calculator"
      data-page-subtitle="A simple calculator..."
      data-nav-config="project"></div>
  </head>
  <body class="project-page">
    <!-- Header injected here -->
    <div id="header-placeholder"></div>

    <main id="main-content">
      <!-- Only page content -->
    </main>

    <!-- Footer injected here -->
    <div id="footer-placeholder"></div>

    <script src="/src/js/components.js"></script>
  </body>
</html>
```

## 🎛️ Navigation Configuration

The component system supports different navigation contexts:

### Home Page Navigation

```javascript
{
  links: [
    { href: '#main-content', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '/src/pages/portfolio.html', text: 'Full Portfolio' },
    { href: '#contact', text: 'Contact' },
  ];
}
```

### Portfolio Page Navigation

```javascript
{
  links: [
    { href: '/#main-content', text: 'Home' },
    { href: '/#about', text: 'About' },
    {
      href: '/src/pages/portfolio.html',
      text: 'Full Portfolio',
      current: true,
    },
    { href: '/#contact', text: 'Contact' },
  ];
}
```

### Project Page Navigation

```javascript
{
  links: [
    { href: '/#main-content', text: 'Home' },
    { href: '/src/pages/portfolio.html', text: 'Full Portfolio' },
    { href: '/#about', text: 'About' },
    { href: '/#contact', text: 'Contact' },
  ];
}
```

## 🔧 Component Usage

### Automatic Injection (Recommended)

```html
<!-- Components auto-inject based on page context -->
<script
  defer
  src="/src/js/components.js"></script>
```

### Manual Control

```javascript
// Custom navigation
window.UIComponents.injectHeader('project', 'My Page', 'Subtitle');
window.UIComponents.injectFooter();
```

## 🎯 Migration Priority

### Phase 1: Core Pages

- [ ] Calculator
- [ ] Portfolio
- [ ] About
- [ ] Contact

### Phase 2: Project Pages

- [ ] Alien Abduction Form
- [ ] CSS Position Cheat Sheet
- [ ] All portfolio project pages

### Phase 3: Challenge Pages

- [ ] 15 Days of CSS challenges
- [ ] Learning project pages

## 🧪 Testing Strategy

### Before Migration

1. Document current navigation behavior
2. Test all internal links
3. Verify mobile menu functionality

### During Migration

1. Test one page at a time
2. Verify component injection works
3. Check navigation state management
4. Test responsive behavior

### After Migration

1. Full site link testing
2. Cross-browser verification
3. Mobile/desktop functionality
4. Performance impact assessment

## 📦 Rollback Plan

If issues arise:

1. Keep original files as `.backup`
2. Simple find/replace to restore old structure
3. Remove component scripts
4. Restore original build process

## 🎉 Success Metrics

- **DRY Principle**: No duplicated header/footer code
- **Consistency**: All pages use identical navigation
- **Maintainability**: Single place to update navigation
- **Performance**: No negative impact on load times
- **Functionality**: All existing features preserved

## 🚀 Future Enhancements

Once migrated, easy to add:

- Dark mode toggles
- Dynamic navigation highlighting
- Breadcrumb systems
- User preference storage
- A/B testing for navigation
- SEO optimization
- Internationalization support

## 💡 Best Practices

1. **Always test in development first**
2. **Migrate one page type at a time**
3. **Keep component script minimal and fast**
4. **Use semantic HTML in templates**
5. **Maintain accessibility standards**
6. **Document any customizations**

---

This component system transforms your static site into a more maintainable, scalable architecture while preserving all
existing functionality. It's a professional approach that will save significant time on future updates!
