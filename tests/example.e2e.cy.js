// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file contains end-to-end (E2E) tests for your website using Cypress.
// E2E tests simulate real user actions to make sure your site works as expected.
//
// Key concepts:
// - E2E test: Checks the whole flow (like filling a form and submitting)
// - Cypress: Tool for running browser-based tests
// - Selector: Finds elements on the page to interact with
// ------------------------------------------------------------
// Example Cypress E2E test

describe('Homepage', () => {
  it('loads successfully and contains the hero section', () => {
    cy.visit('dist/index.html');
    cy.contains('I Knit The Web'); // Adjust to match your hero/banner text
  });
});
