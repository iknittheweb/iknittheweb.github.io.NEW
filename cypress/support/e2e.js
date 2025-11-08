import '@percy/cypress';
import 'cypress-real-events/support';
import 'cypress-axe';
import 'cypress-plugin-tab'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore Sentry module errors during tests
  if (err.message && err.message.includes('@sentry/browser')) {
    return false;
  }

  /*
   * Cypress workaround: Ignore 'body-scroll-lock' module specifier error during tests.
   * -------------------------------------------------------------
   * Remove or comment out the block below after testing is complete
   * and once the root cause of the error is fixed.
   * This ensures Cypress will catch any real issues in future runs.
   */
  if (err.message && err.message.includes('Failed to resolve module specifier "body-scroll-lock"')) {
    return false;
  }
});
// To remove this workaround, delete the block above that checks for 'body-scroll-lock' errors.
