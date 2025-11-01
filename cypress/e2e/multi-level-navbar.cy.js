// Cypress E2E test for multi-level navbar best practices

/// <reference types="cypress" />

describe('Multi-Level Navbar', () => {
  it('should handle disabled nav items gracefully', () => {
    cy.get('[data-cy="multi-navbar-home"]').invoke('attr', 'disabled', true);
    cy.get('[data-cy="multi-navbar-home"]').click({ force: true });
    cy.url().should('include', 'multi-level-navbar.html');
  });

  it('should not execute XSS from nav items', () => {
    cy.get('[data-cy="multi-navbar-home"]').invoke('html', '<a href="#" onclick="window.xss=true">XSS</a>');
    cy.get('[data-cy="multi-navbar-home"] a').click({ force: true });
    cy.window().its('xss').should('not.exist');
  });
  it('should have a visible skip link for accessibility', () => {
    cy.get('.skip-link').should('exist').and('have.attr', 'href').and('include', 'main-content');
    cy.get('.skip-link').focus().should('be.visible');
  });

  it('should have correct ARIA attributes on nav and sublists', () => {
    cy.get('nav.multi-level-navbar').should('have.attr', 'aria-label');
    cy.get('.multi-level-navbar__sublist').each(($el) => {
      expect($el).to.have.attr('role');
    });
  });

  it('should follow correct focus order for keyboard users', () => {
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-cy', 'multi-navbar-home');
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-cy', 'multi-navbar-gastropods');
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-cy', 'multi-navbar-bivalvia');
  });

  it('should allow keyboard navigation through subitems', () => {
    cy.get('[data-cy="multi-navbar-home"]').focus().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem').first().find('a').should('be.focused');
    cy.focused().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem').eq(1).find('a').should('be.focused');
  });
  beforeEach(() => {
    cy.visit('multi-level-navbar.html'); // Adjust path if needed
  });

  it('should render all top-level nav items', () => {
    cy.get('[data-cy="multi-navbar-list"]').find('[data-cy="multi-navbar-home"]').should('exist');
    cy.get('[data-cy="multi-navbar-list"]').find('[data-cy="multi-navbar-gastropods"]').should('exist');
    cy.get('[data-cy="multi-navbar-list"]').find('[data-cy="multi-navbar-bivalvia"]').should('exist');
  });

  it('should show sublist on hover/focus for Home', () => {
    cy.get('[data-cy="multi-navbar-home"]').focus();
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__sublist').should('be.visible');
  });

  it('should be keyboard accessible', () => {
    cy.get('[data-cy="multi-navbar-home"]').focus().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem').first().find('a').should('be.focused');
  });

  it('should pass basic accessibility checks', () => {
    cy.injectAxe();
    cy.checkA11y('[data-cy="multi-navbar-list"]');
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy="multi-navbar-home"]').should('be.visible');
  });
});
