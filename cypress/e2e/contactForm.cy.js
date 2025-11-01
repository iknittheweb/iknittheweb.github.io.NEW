// contactForm.cy.js
// Cypress E2E tests for contact form UI/interaction

describe('Contact Form UI/Interaction', () => {
  beforeEach(() => {
    cy.visit('contact.html'); // Change to the page containing the contact form if needed
  });

  it('should validate fields and set aria-invalid', () => {
    cy.get('#name').clear().type('');
    cy.get('#name').should('have.attr', 'aria-invalid', 'true');
    cy.get('#name').type('A');
    cy.get('#name').should('have.attr', 'aria-invalid', 'true');
    cy.get('#name').clear().type('Valid Name');
    cy.get('#name').should('have.attr', 'aria-invalid', 'false');
  });

  it('should associate error messages via aria-describedby', () => {
    cy.get('#name').clear().type('');
    cy.get('#name').should('have.attr', 'aria-describedby', 'name-error');
    cy.get('#name-error').should('be.visible').and('not.be.empty');
  });

  it('should focus first invalid field on submit', () => {
    cy.get('#email').clear();
    cy.get('#message').clear();
    cy.get('.contact__submit').click();
    cy.focused().should('have.id', 'name');
  });

  // Add more tests for live region announcements if needed
});
