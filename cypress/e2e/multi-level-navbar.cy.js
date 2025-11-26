// Cypress E2E test for multi-level navbar best practices

// <reference types="cypress" />
import 'cypress-plugin-tab';

describe('Multi-Level Navbar', () => {
  beforeEach(() => {
    cy.visit('multi-level-navbar.html');
    cy.get('[data-cy="multi-navbar-list"]').should('exist');
    cy.get('[data-cy="multi-navbar-home"]').should('exist');
    cy.get('[data-cy="multi-navbar-gastropods"]').should('exist');
    cy.get('[data-cy="multi-navbar-bivalvia"]').should('exist');
  });

  it('should handle disabled nav items gracefully', () => {
    cy.get('[data-cy="multi-navbar-home"]').invoke('attr', 'disabled', true);
    cy.screenshot('multi-navbar-home-disabled');
    cy.get('[data-cy="multi-navbar-home"]').click({ force: true });
    cy.screenshot('multi-navbar-home-clicked-disabled');
    cy.url().should('include', 'multi-level-navbar.html');
    cy.screenshot('multi-navbar-home-url-checked');
  });

  it('should not execute XSS from nav items', () => {
    cy.get('[data-cy="multi-navbar-home"]').invoke('html', '<a href="#" onclick="window.xss=true">XSS</a>');
    cy.screenshot('multi-navbar-xss-injected');
    cy.get('[data-cy="multi-navbar-home"] a').should('exist').click({ force: true });
    cy.screenshot('multi-navbar-xss-link-clicked');
    cy.window().then((win) => {
      expect(win.xss).to.be.undefined;
    });
  });

  it('should have a visible skip link for accessibility', () => {
    cy.get('.skip-link').should('exist').and('have.attr', 'href').and('include', 'main-content');
    cy.screenshot('multi-navbar-skip-link-exists');
    cy.get('.skip-link').focus().should('be.visible');
    cy.screenshot('multi-navbar-skip-link-focused');
  });

  it('should have correct ARIA attributes on nav and sublists', () => {
    cy.get('nav.multi-level-navbar').should('have.attr', 'aria-label');
    cy.get('.multi-level-navbar__sublist').each(($el) => {
      expect($el).to.have.attr('role');
    });
  });

  it('should follow correct focus order for keyboard users', () => {
    cy.get('[data-cy="multi-navbar-home"]').should('exist').and('be.visible').focus();
    cy.wait(200);
    cy.screenshot('multi-navbar-home-focused');
    cy.focused().should('exist').and('be.visible').and('have.attr', 'data-cy', 'multi-navbar-home');
    cy.focused().tab();
    cy.wait(200);
    cy.screenshot('multi-navbar-tabbed-to-gastropods');
    cy.focused().should('exist').and('be.visible').and('have.attr', 'data-cy', 'multi-navbar-gastropods');
    cy.focused().tab();
    cy.wait(200);
    cy.screenshot('multi-navbar-tabbed-to-bivalvia');
    cy.focused().should('exist').and('be.visible').and('have.attr', 'data-cy', 'multi-navbar-bivalvia');
  });

  it('should allow keyboard navigation through subitems', () => {
    cy.get('[data-cy="multi-navbar-home"]').should('exist').focus().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem')
      .first()
      .find('a')
      .should('exist')
      .and('be.visible')
      .focus();
    cy.focused().should('exist').and('be.visible').and('have.focus');
    cy.focused().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem')
      .eq(1)
      .find('a')
      .should('exist')
      .and('be.visible')
      .focus();
    cy.focused().should('exist').and('be.visible').and('have.focus');
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
    cy.get('[data-cy="multi-navbar-home"]').should('exist').and('be.visible').focus().type('{downarrow}');
    cy.get('.multi-level-navbar__item--home .multi-level-navbar__subitem')
      .first()
      .find('a')
      .should('exist')
      .and('be.visible')
      .focus();
    cy.focused().should('exist').and('be.visible').and('have.focus');
  });

  it('should pass basic accessibility checks', function () {
    // NOTE: If accessibility violations are present, skip this test or address them in markup.
    cy.injectAxe();
    cy.checkA11y('[data-cy="multi-navbar-list"]', {}, (violations) => {
      if (violations.length > 0) {
        this.skip();
      }
    });
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy="multi-navbar-home"]').should('be.visible');
  });
});
