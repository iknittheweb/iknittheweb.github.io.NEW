const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Percy does not require plugin setup here
      return config;
    },
    baseUrl: 'http://localhost:5500', // Adjust if needed
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.visual.cy.js',
  },
});
