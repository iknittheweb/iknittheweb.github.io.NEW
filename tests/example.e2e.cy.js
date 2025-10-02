// Example Cypress E2E test

describe('Homepage', () => {
  it('loads successfully and contains the hero section', () => {
    cy.visit('index.html');
    cy.contains('I Knit The Web'); // Adjust to match your hero/banner text
  });
});
