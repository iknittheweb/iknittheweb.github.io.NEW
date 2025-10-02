#!/usr/bin/env node

/*
  🧩 COMPONENT-BASED BUILD SYSTEM
  
  This enhanced build system supports:
  - Template-based page generation
  - Centralized header/footer components
  - Environment-specific URL replacement
  - Automated page creation from templates
  
  USAGE:
  - npm run build:pages  → Generate all pages from templates
  - npm run dev          → Build for development
  - npm run deploy       → Build for production
*/

const fs = require('fs');
const path = require('path');

// Load environment variables from .env or .env.production
// Uses dotenv for easy environment management
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

/*
  Environment variable usage:
  - BASE_URL: The base URL for your site (e.g., https://iknittheweb.github.io or your custom domain)
  - ASSET_URL: The base path or URL for your static assets (e.g., /src/img or https://yourdomain.com/src/img)
  Set these in your .env (for development) and .env.production (for production) files.
*/

const baseUrl = process.env.BASE_URL;
const assetUrl = process.env.ASSET_URL;

if (!baseUrl || !assetUrl) {
  console.error('❌ BASE_URL and ASSET_URL must be set in your .env or .env.production file.');
  process.exit(1);
}

// Page configurations
const pages = [
  {
    template: 'page-template.html',
    output: 'calculator.html',
    data: {
      PAGE_TITLE: 'Calculator',
      PAGE_SUBTITLE: 'A simple calculator built with HTML, CSS, and JavaScript',
      PAGE_DESCRIPTION:
        'Interactive calculator web application built with HTML, CSS, and JavaScript. Features a clean design and full mathematical functionality including basic arithmetic operations.',
      PAGE_KEYWORDS:
        'calculator, javascript calculator, web calculator, math calculator, interactive calculator, HTML CSS JavaScript',
      PAGE_IMAGE: '/src/img/cards/Calculator.jpg',
      PAGE_URL: 'src/pages/calculator.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page calculator-page',
      MAIN_CLASS: 'calculator-main',
      NAV_CONFIG: 'project',
      BREADCRUMB_CATEGORY: 'Featured Projects',
      BREADCRUMB_CATEGORY_URL: '/src/pages/portfolio.html#featured-projects',
      CONTENT: `
        <section class="calculator-section">
          <div class="wrapper-2">
            <section class="screen" role="status" aria-live="polite">0</section>
            <section class="calc-buttons">
              <div class="calc-button-row">
                <button class="calc-button double" aria-label="Clear">C</button>
                <button class="calc-button" aria-label="Backspace">&larr;</button>
                <button class="calc-button" aria-label="Divide">&divide;</button>
              </div>
              <div class="calc-button-row">
                <button class="calc-button" aria-label="7">7</button>
                <button class="calc-button" aria-label="8">8</button>
                <button class="calc-button" aria-label="9">9</button>
                <button class="calc-button" aria-label="Multiply">&times;</button>
              </div>
              <div class="calc-button-row">
                <button class="calc-button" aria-label="4">4</button>
                <button class="calc-button" aria-label="5">5</button>
                <button class="calc-button" aria-label="6">6</button>
                <button class="calc-button" aria-label="Subtract">&minus;</button>
              </div>
              <div class="calc-button-row">
                <button class="calc-button" aria-label="1">1</button>
                <button class="calc-button" aria-label="2">2</button>
                <button class="calc-button" aria-label="3">3</button>
                <button class="calc-button" aria-label="Add">&plus;</button>
              </div>
              <div class="calc-button-row">
                <button class="calc-button triple" aria-label="0">0</button>
                <button class="calc-button" aria-label="Equals">&equals;</button>
              </div>
            </section>
          </div>
        </section>
      `,
      PAGE_STYLES: '<link rel="stylesheet" href="/src/css/calculator.css">',
      PAGE_SCRIPTS: '<script defer src="/src/js/calculator.js"></script>',
    },
  },
  {
    template: 'page-template.html',
    output: 'about.html',
    data: {
      PAGE_TITLE: 'About Me',
      PAGE_SUBTITLE: 'Knitting the web, one site at a time',
      PAGE_DESCRIPTION:
        'Learn about the developer behind I Knit The Web. My journey from freeCodeCamp to professional web development, certifications, and passion for creating handcrafted websites.',
      PAGE_KEYWORDS:
        'about I Knit The Web, web developer story, freeCodeCamp, Codecademy, Frontend Masters, web development journey',
      PAGE_IMAGE: '/src/img/branding/Profile.png',
      PAGE_URL: 'about.html',
      PAGE_TYPE: 'profile',
      BODY_CLASS: 'about-page',
      MAIN_CLASS: 'about-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="about">
          <!-- About content -->
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/alien-abduction-form.html',
    data: {
      PAGE_TITLE: 'Alien Abduction Order Form',
      PAGE_SUBTITLE: 'When you want an alien abduction, you want it your way',
      PAGE_DESCRIPTION:
        'Interactive alien abduction order form with custom HTML form elements, validation, and humorous content. Built with HTML, CSS, and JavaScript.',
      PAGE_KEYWORDS:
        'alien abduction form, HTML forms, interactive forms, form validation, JavaScript forms, funny web projects',
      PAGE_IMAGE: '/src/img/cards/Alien-abduction-form-thumb.jpg',
      PAGE_URL: 'src/pages/portfolio-pages/alien-abduction-form.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page alien-form-page',
      MAIN_CLASS: 'alien-form-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="alien-form-section">
          <div class="form-container">
            <!-- Alien abduction form content will go here -->
            <h2>Alien Abduction Order Form</h2>
            <p>Fill out the form below to submit your abduction request.</p>
            <!-- Form elements here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '<script defer src="/src/js/alien-abduction-form.js"></script>',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/css-position-cheat-sheet.html',
    data: {
      PAGE_TITLE: 'CSS Position Cheat Sheet',
      PAGE_SUBTITLE: 'Visual guide to CSS positioning properties',
      PAGE_DESCRIPTION:
        'Comprehensive CSS position cheat sheet demonstrating static, relative, absolute, fixed, and sticky positioning with visual examples and code snippets.',
      PAGE_KEYWORDS:
        'CSS position cheat sheet, CSS positioning, absolute relative fixed sticky, CSS reference, web development guide',
      PAGE_IMAGE: '/src/img/cards/css-position-cheat-sheet-thumb.png',
      PAGE_URL: 'src/pages/portfolio-pages/css-position-cheat-sheet.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page css-cheat-page',
      MAIN_CLASS: 'css-cheat-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="css-cheat-section">
          <div class="cheat-sheet-container">
            <!-- CSS position cheat sheet content will go here -->
            <h2>CSS Position Properties</h2>
            <p>Visual examples of how different position values work.</p>
            <!-- Cheat sheet content here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/fifteenDaysofCSS-Day-5-Challenge.html',
    data: {
      PAGE_TITLE: '15 Days of CSS - Day 5 Challenge',
      PAGE_SUBTITLE: 'CSS animation and transition challenges',
      PAGE_DESCRIPTION:
        'Day 5 challenge from the 15 Days of CSS series, featuring advanced CSS animations, transitions, and interactive elements.',
      PAGE_KEYWORDS:
        '15 days of CSS, CSS animations, CSS transitions, CSS challenges, web development practice',
      PAGE_IMAGE: '/src/img/branding/logo.png',
      PAGE_URL: 'src/pages/portfolio-pages/fifteenDaysofCSS-Day-5-Challenge.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page css-challenge-page',
      MAIN_CLASS: 'css-challenge-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="css-challenge-section">
          <div class="challenge-container">
            <!-- CSS challenge content will go here -->
            <h2>15 Days of CSS - Day 5</h2>
            <p>Advanced CSS animations and transitions challenge.</p>
            <!-- Challenge content here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/fifteenDaysOfCSS-Day4-BasicVerticalNavbars.html',
    data: {
      PAGE_TITLE: '15 Days of CSS - Day 4: Vertical Navigation',
      PAGE_SUBTITLE: 'Creating responsive vertical navigation bars',
      PAGE_DESCRIPTION:
        'Day 4 challenge featuring vertical navigation bar design with CSS. Covers responsive design principles and modern navigation patterns.',
      PAGE_KEYWORDS:
        '15 days of CSS, vertical navigation, CSS navbar, responsive navigation, web development',
      PAGE_IMAGE: '/src/img/branding/logo.png',
      PAGE_URL: 'src/pages/portfolio-pages/fifteenDaysOfCSS-Day4-BasicVerticalNavbars.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page nav-challenge-page',
      MAIN_CLASS: 'nav-challenge-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="nav-challenge-section">
          <div class="challenge-container">
            <!-- Navigation challenge content will go here -->
            <h2>15 Days of CSS - Day 4</h2>
            <p>Vertical navigation bar challenge with responsive design.</p>
            <!-- Challenge content here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/fifteenDaysofHTML-Day5-Desc-List-Challenge.html',
    data: {
      PAGE_TITLE: '15 Days of HTML - Day 5: Description Lists',
      PAGE_SUBTITLE: 'Semantic HTML with description lists',
      PAGE_DESCRIPTION:
        'Day 5 HTML challenge focusing on proper semantic markup using description lists (dl, dt, dd) for structured content presentation.',
      PAGE_KEYWORDS:
        '15 days of HTML, description lists, semantic HTML, HTML challenges, web accessibility',
      PAGE_IMAGE: '/src/img/branding/logo.png',
      PAGE_URL: 'src/pages/portfolio-pages/fifteenDaysofHTML-Day5-Desc-List-Challenge.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page html-challenge-page',
      MAIN_CLASS: 'html-challenge-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="html-challenge-section">
          <div class="challenge-container">
            <!-- HTML challenge content will go here -->
            <h2>15 Days of HTML - Day 5</h2>
            <p>Description lists and semantic markup challenge.</p>
            <!-- Challenge content here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio-pages/navbar-link-filling-li.html',
    data: {
      PAGE_TITLE: 'Navbar Link Filling LI',
      PAGE_SUBTITLE: 'Advanced CSS navigation techniques',
      PAGE_DESCRIPTION:
        'Demonstration of advanced CSS techniques for creating navigation links that fill their list item containers with smooth hover effects.',
      PAGE_KEYWORDS: 'CSS navigation, navbar techniques, hover effects, CSS links, web development',
      PAGE_IMAGE: '/src/img/branding/logo.png',
      PAGE_URL: 'src/pages/portfolio-pages/navbar-link-filling-li.html',
      PAGE_TYPE: 'article',
      BODY_CLASS: 'project-page navbar-demo-page',
      MAIN_CLASS: 'navbar-demo-main',
      NAV_CONFIG: 'project',
      CONTENT: `
        <section class="navbar-demo-section">
          <div class="demo-container">
            <!-- Navbar demo content will go here -->
            <h2>Navbar Link Filling Techniques</h2>
            <p>Advanced CSS for filling list item containers with navigation links.</p>
            <!-- Demo content here -->
          </div>
        </section>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  {
    template: 'page-template.html',
    output: 'portfolio.html',
    data: {
      PAGE_TITLE: 'Full Portfolio | I Knit The Web',
      PAGE_SUBTITLE: 'Complete collection of web development projects',
      PAGE_DESCRIPTION:
        'Explore my complete portfolio of web development projects including featured applications, learning challenges, and UI experiments showcasing HTML, CSS, and JavaScript skills.',
      PAGE_KEYWORDS:
        'portfolio, web development, HTML, CSS, JavaScript, projects, frontend development, coding challenges, UI experiments',
      PAGE_IMAGE: '/src/img/branding/logo.png',
      PAGE_URL: 'src/pages/portfolio.html',
      PAGE_TYPE: 'website',
      BODY_CLASS: 'portfolio-page',
      MAIN_CLASS: 'portfolio-main',
      NAV_CONFIG: 'portfolio',
      CONTENT: `
        <div class="wrapper">
          <h1 class="portfolio-page__title">My Full Portfolio</h1>
          <p class="portfolio-page__intro">
            Welcome to my full portfolio showcasing every web development project
            I've created! From practical applications to learning challenges, each
            project represents a step in my journey of mastering HTML, CSS,
            JavaScript, and modern web development practices.
          </p>

          <!-- Featured Projects Section -->
          <section class="portfolio-section">
            <h2 class="portfolio-section__heading">Featured Projects</h2>
            <p class="portfolio-section__intro">
              These are my most comprehensive projects showcasing practical
              applications and real-world problem solving.
            </p>
            <div class="portfolio__row">
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">Alien Abduction Order Form</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of Alien Abduction Order Form project"
                      src="/src/img/cards/Alien-abduction-form-thumb.jpg"
                      class="card-image"
                      width="345"
                      height="259"
                    />
                    <figcaption class="card__caption">
                      <p>
                        When you want an alien abduction, you want it your way.
                        Fill out this form to get started.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/alien-abduction-form.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">Calculator</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of Calculator project"
                      src="/src/img/cards/Calculator-thumb.jpg"
                      class="card-image"
                      width="356"
                      height="268"
                    />
                    <figcaption class="card__caption">
                      <p>
                        A simple calculator built with HTML, CSS, and JavaScript.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/calculator.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">CSS Position Cheat Sheet</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of CSS Position Cheat Sheet project"
                      src="/src/img/cards/css-position-cheat-sheet-thumb.png"
                      class="card-image"
                      width="1868"
                      height="1401"
                    />
                    <figcaption class="card__caption">
                      <p>
                        I created this cheat sheet as an assignment on
                        <a
                          href="https://www.codecademy.com/learn/paths/front-end-engineer-career-path"
                          target="_blank"
                          rel="noopener"
                          >Codecademy's Front-End Engineer Career Path</a
                        >.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/css-position-cheat-sheet.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
            </div>
          </section>

          <hr />

          <!-- Learning Challenges Section -->
          <section class="portfolio-section">
            <h2 class="portfolio-section__heading">Learning Challenges</h2>
            <p class="portfolio-section__intro">
              Daily coding challenges that helped me develop specific skills and
              explore different techniques in HTML and CSS.
            </p>
            <div class="portfolio__row">
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">15 Days of CSS - Day 5 Challenge</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of 15 Days of CSS Day 5 Challenge project"
                      src="/src/img/pages/galaxy.jpg"
                      class="card-image"
                      width="400"
                      height="300"
                    />
                    <figcaption class="card__caption">
                      <p>
                        CSS challenge focusing on advanced styling techniques and
                        creative layouts.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/fifteenDaysofCSS-Day-5-Challenge.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">
                    15 Days of CSS - Day 4 Vertical Navbars
                  </h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of 15 Days of CSS Day 4 Basic Vertical Navbars project"
                      src="/src/img/pages/galaxy.jpg"
                      class="card-image"
                      width="400"
                      height="300"
                    />
                    <figcaption class="card__caption">
                      <p>
                        Exploring vertical navigation bar design and
                        implementation with CSS.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/fifteenDaysOfCSS-Day4-BasicVerticalNavbars.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">15 Days of HTML - Day 5 Desc List</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of 15 Days of HTML Day 5 Description List Challenge project"
                      src="/src/img/pages/galaxy.jpg"
                      class="card-image"
                      width="400"
                      height="300"
                    />
                    <figcaption class="card__caption">
                      <p>
                        HTML challenge focusing on semantic markup and description
                        list structures.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/fifteenDaysofHTML-Day5-Desc-List-Challenge.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
            </div>
          </section>

          <hr />

          <!-- Experiments Section -->
          <section class="portfolio-section">
            <h2 class="portfolio-section__heading">UI Experiments</h2>
            <p class="portfolio-section__intro">
              Focused experiments exploring specific UI patterns and interactive
              elements.
            </p>
            <div class="portfolio__row">
              <article class="card">
                <div class="card-header">
                  <h3 class="card__title">Navbar Link Filling Li</h3>
                </div>
                <div class="card-body">
                  <figure class="card-figure">
                    <img
                      alt="Thumbnail preview of Navbar Link Filling Li project"
                      src="/src/img/pages/galaxy.jpg"
                      class="card-image"
                      width="400"
                      height="300"
                    />
                    <figcaption class="card__caption">
                      <p>
                        Navigation bar styling with full-width link areas for
                        improved user experience.
                      </p>
                    </figcaption>
                  </figure>
                  <a
                    href="/src/pages/portfolio-pages/navbar-link-filling-li.html"
                    class="card-button card__button--primary card-link"
                  >
                    see page
                  </a>
                </div>
              </article>
            </div>
          </section>

          <hr />

          <!-- Back to Home -->
          <section class="portfolio-back">
            <p class="portfolio-back__text">
              Ready to work together?
              <a href="/#contact" class="portfolio-back__link">Let's connect</a>
              or
              <a href="/" class="portfolio-back__link">return to homepage</a>.
            </p>
          </section>
        </div>
      `,
      PAGE_SCRIPTS: '',
    },
  },
  // Add more pages as needed
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
