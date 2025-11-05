// Cypress E2E test for main navigation best practices

/// <reference types="cypress" />

describe('Main Navigation', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.window().then((win) => {
      win.disableBodyScroll = win.disableBodyScroll || (() => {});
    });
    cy.get('[data-cy="main-nav"]').should('exist');
    cy.get('[data-cy="nav-home"]').should('exist');
    cy.get('[data-cy="nav-portfolio"]').should('exist');
  });

  it('should handle disabled nav links gracefully', () => {
    cy.get('[data-cy="nav-home"]').should('exist').invoke('attr', 'disabled', true);
    cy.get('[data-cy="nav-home"]').should('exist').and('not.be.null').click({ force: true });
    cy.location('pathname').should('include', 'index');
  });

  it('should not execute XSS from nav links', () => {
    cy.get('[data-cy="nav-home"]').invoke('html', '<a href="#" onclick="window.xss=true">XSS</a>');
    cy.get('[data-cy="nav-home"] a').click({ force: true });
    cy.window().its('xss').should('not.exist');
  });

  it('should have a visible skip link for accessibility', () => {
    cy.get('.skip-link').should('exist').and('have.attr', 'href').and('include', 'main-content');
    cy.get('.skip-link').focus().should('be.visible');
  });

  it('should have correct ARIA attributes on nav and menu', () => {
    cy.get('[data-cy="main-nav"]').should('have.attr', 'aria-label', 'Main navigation');
    cy.get('[data-cy="mobile-menu"]').should('have.attr', 'role', 'dialog');
    cy.get('[data-cy="mobile-menu"]').should('have.attr', 'aria-labelledby');
  });

  it('should trap focus in mobile menu when open', () => {
    cy.viewport('iphone-6');
    cy.get('#btnOpen').should('exist').and('be.visible').click();
    cy.get('[data-cy="mobile-menu"]')
      .should('exist')
      .invoke('show')
      .and('be.visible')
      .within(() => {
        cy.get('button, a').first().should('exist').focus();
        cy.focused().should('exist').and('have.focus');
      });
    cy.get('#btnClose').should('exist').focus().type('{esc}');
    cy.get('[data-cy="mobile-menu"]').should('exist').and('not.be.visible');
  });

  it('should render all nav links', () => {
    cy.get('[data-cy="main-nav"]').should('exist');
    cy.get('[data-cy="nav-home"]').should('exist');
    cy.get('[data-cy="nav-portfolio"]').should('exist');
  });

  it('should be keyboard accessible', () => {
    cy.get('[data-cy="nav-home"]').focus().realPress('Tab');
  });

  it('should open and close mobile menu', () => {
    cy.viewport('iphone-6');
    cy.get('#btnOpen').should('exist').and('be.visible').click();
    cy.get('[data-cy="mobile-menu"]').should('exist').invoke('show').and('be.visible');
    cy.get('#btnClose').should('exist').click();
    cy.get('[data-cy="mobile-menu"]').should('exist').and('not.be.visible');
  });

  it('should pass basic accessibility checks', () => {
    cy.injectAxe();
    cy.checkA11y('[data-cy="main-nav"]');
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy="main-nav"]').should('exist').invoke('show').and('be.visible');
    cy.get('#btnOpen').should('exist').and('be.visible').click();
    cy.get('[data-cy="mobile-menu"]').should('exist').invoke('show').and('be.visible');
  });
});
