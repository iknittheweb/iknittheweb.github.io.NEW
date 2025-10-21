const { defineConfig } = require('cypress');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3000', // Adjust if needed
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.visual.cy.js',
  },
});
