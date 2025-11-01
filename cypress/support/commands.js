// Custom Cypress commands for best practices
// Example: custom command for dropdown open
Cypress.Commands.add('openDropdown', (selector = '[data-cy="dropdown-trigger"]') => {
  cy.get(selector).click();
  cy.get('[data-cy="dropdown-content"]').should('have.class', 'show');
});

// Example usage in a test:
// cy.openDropdown();
