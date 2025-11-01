// Cypress E2E test for contact form best practices

/// <reference types="cypress" />

describe('Contact Form', () => {
  it('should handle disabled submit button gracefully', () => {
    cy.get('[data-cy="contact-submit"]').invoke('attr', 'disabled', true);
    cy.get('[data-cy="contact-submit"]').click({ force: true });
    // No form submission should occur
    cy.url().should('include', 'index.html');
  });

  it('should not execute XSS from form fields', () => {
    cy.get('[data-cy="contact-name"]').type('<img src=x onerror=window.xss=1>');
    cy.get('[data-cy="contact-email"]').type('test@example.com');
    cy.get('[data-cy="contact-message"]').type('Hello');
    cy.get('[data-cy="contact-submit"]').click();
    cy.window().its('xss').should('not.exist');
  });
  it('should have correct ARIA attributes and accessible labels', () => {
    cy.get('[data-cy="contact-name"]').should('have.attr', 'aria-describedby');
    cy.get('[data-cy="contact-email"]').should('have.attr', 'aria-describedby');
    cy.get('[data-cy="contact-message"]').should('have.attr', 'aria-describedby');
    cy.get('label[for="name"]').should('exist');
    cy.get('label[for="email"]').should('exist');
    cy.get('label[for="message"]').should('exist');
  });

  it('should show error messages when fields are invalid', () => {
    cy.get('[data-cy="contact-submit"]').click();
    cy.get('#name-error').should('be.visible');
    cy.get('#email-error').should('be.visible');
    cy.get('#message-error').should('be.visible');
  });

  it('should follow correct focus order for keyboard users', () => {
    cy.get('body').realPress('Tab');
    cy.focused().should('have.attr', 'data-cy', 'contact-name');
    cy.focused().realPress('Tab');
    cy.focused().should('have.attr', 'data-cy', 'contact-email');
    cy.focused().realPress('Tab');
    cy.focused().should('have.attr', 'data-cy', 'contact-message');
    cy.focused().realPress('Tab');
    cy.focused().should('have.attr', 'data-cy', 'contact-submit');
  });
  beforeEach(() => {
    cy.visit('index.html'); // Adjust path if needed
  });

  it('should render all required fields', () => {
    cy.get('[data-cy="contact-form"]').should('exist');
    cy.get('[data-cy="contact-name"]').should('exist');
    cy.get('[data-cy="contact-email"]').should('exist');
    cy.get('[data-cy="contact-message"]').should('exist');
    cy.get('[data-cy="contact-submit"]').should('exist');
  });

  it('should validate required fields', () => {
    cy.get('[data-cy="contact-submit"]').click();
    cy.get('[data-cy="contact-name"]').then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });
    cy.get('[data-cy="contact-email"]').then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });
    cy.get('[data-cy="contact-message"]').then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });
  });

  it('should allow valid submission', () => {
    cy.get('[data-cy="contact-name"]').type('Test User');
    cy.get('[data-cy="contact-email"]').type('test@example.com');
    cy.get('[data-cy="contact-message"]').type('This is a test message.');
    cy.get('[data-cy="contact-submit"]').click();
    // You may want to check for a success message or redirect here
  });

  it('should pass basic accessibility checks', () => {
    cy.injectAxe();
    cy.checkA11y('[data-cy="contact-form"]');
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy="contact-form"]').should('be.visible');
  });
});
