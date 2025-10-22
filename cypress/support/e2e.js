import '@percy/cypress';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore Sentry module errors during tests
  if (err.message && err.message.includes('@sentry/browser')) {
    return false;
  }
});
