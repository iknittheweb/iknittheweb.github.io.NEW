// Cypress E2E tests for dropdown UI/interaction
import 'cypress-plugin-tab';
describe('Dropdown UI/Interaction', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.get('[data-cy="dropdown-trigger"]').should('exist');
    cy.get('[data-cy="dropdown-content"]').should('exist');
  });
  it('should handle disabled state gracefully', () => {
    // Simulate disabling the dropdown trigger
    cy.get('[data-cy="dropdown-trigger"]').invoke('attr', 'disabled', true);
    cy.screenshot('dropdown-trigger-disabled');
    cy.get('[data-cy="dropdown-trigger"]').click({ force: true });
    cy.screenshot('dropdown-trigger-clicked-disabled');
    cy.get('[data-cy="dropdown-content"]').should('not.have.class', 'show');
    cy.screenshot('dropdown-content-not-shown');
  });

  it('should not execute XSS from dropdown content', () => {
    // Simulate XSS attempt in dropdown content
    cy.get('[data-cy="dropdown-content"]').invoke('html', '<a href="#" onclick="window.xss=true">XSS</a>');
    cy.screenshot('dropdown-xss-injected');
    cy.get('[data-cy="dropdown-content"] a').click({ force: true });
    cy.screenshot('dropdown-xss-link-clicked');
    cy.window().its('xss').should('not.exist');
  });
  it('should have a visible skip link for accessibility', () => {
    cy.get('.skip-link').should('exist').and('have.attr', 'href').and('include', 'main-content');
    cy.screenshot('skip-link-exists');
    cy.get('.skip-link').focus().should('be.visible');
    cy.screenshot('skip-link-focused');
  });

  it('should have correct ARIA attributes on dropdown', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('have.attr', 'aria-controls');
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'aria-labelledby');
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'aria-hidden');
  });

  it('should trap focus within dropdown when open', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.screenshot('dropdown-trigger-clicked');
    cy.get('.dropdown__title-group').click();
    cy.screenshot('dropdown-title-group-clicked');
    cy.get('[data-cy="dropdown-first-item"]').should('be.focused');
    cy.screenshot('dropdown-first-item-focused');
    cy.get('[data-cy="dropdown-content"]').should('exist').invoke('addClass', 'show').and('have.class', 'show');
    cy.screenshot('dropdown-content-shown');
    cy.get('[data-cy="dropdown-content"] a, [data-cy="dropdown-content"] button').first().should('exist').focus();
    cy.screenshot('dropdown-content-first-item-focused');
    cy.focused().should('exist').and('have.focus');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').type('{esc}');
    cy.screenshot('dropdown-escape-pressed');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('not.have.class', 'show');
    cy.screenshot('dropdown-content-closed');
  });

  it('should follow correct focus order for keyboard users', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').focus().type('{enter}');
    cy.screenshot('dropdown-trigger-keyboard-open');
    cy.get('[data-cy="dropdown-content"]').should('exist').invoke('addClass', 'show').and('have.class', 'show');
    cy.screenshot('dropdown-content-keyboard-shown');
    cy.get('[data-cy="dropdown-content"] a, [data-cy="dropdown-content"] button').first().should('exist').focus();
    cy.screenshot('dropdown-content-keyboard-first-item-focused');
    cy.focused().tab();
    cy.screenshot('dropdown-content-keyboard-tabbed');
    cy.get('[data-cy="dropdown-content"] a, [data-cy="dropdown-content"] button')
      .eq(1)
      .should('exist')
      .and('have.focus');
  });

  it('should set ARIA attributes on init', () => {
    cy.get('[data-cy="dropdown-trigger"]')
      .should('have.attr', 'role', 'button')
      .and('have.attr', 'aria-controls', 'dropdown-content')
      .and('have.attr', 'tabindex', '0');
    cy.screenshot('dropdown-trigger-aria-checked');
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'role', 'menu');
    cy.screenshot('dropdown-content-aria-checked');
  });

  it('should toggle dropdown open/close on click', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.screenshot('dropdown-trigger-toggle-open');
    cy.get('[data-cy="dropdown-content"]')
      .should('exist')
      .invoke('addClass', 'show')
      .and('have.class', 'show')
      .and('have.attr', 'aria-hidden', 'false');
    cy.screenshot('dropdown-content-toggle-open');
    cy.get('[data-cy="dropdown-trigger"]')
      .should('exist')
      .should('have.class', 'dropdown-open')
      .and('have.attr', 'aria-expanded', 'true');
    cy.screenshot('dropdown-trigger-toggle-opened');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.screenshot('dropdown-trigger-toggle-close');
    cy.get('[data-cy="dropdown-content"]')
      .should('exist')
      .and('not.have.class', 'show')
      .and('have.attr', 'aria-hidden', 'true');
    cy.screenshot('dropdown-content-toggle-closed');
    cy.get('[data-cy="dropdown-trigger"]')
      .should('exist')
      .should('not.have.class', 'dropdown-open')
      .and('have.attr', 'aria-expanded', 'false');
    cy.screenshot('dropdown-trigger-toggle-closed');
  });

  it('should handle keyboard events (Enter, Space, Escape)', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').focus().type('{enter}');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('have.class', 'show');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').type('{esc}');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('not.have.class', 'show');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').type(' ');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('have.class', 'show');
  });

  it('should pass basic accessibility checks', () => {
    cy.injectAxe();
    cy.screenshot('dropdown-axe-injected');
    cy.checkA11y('[data-cy="dropdown-content"]');
    cy.screenshot('dropdown-axe-checked');
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.screenshot('dropdown-mobile-viewport');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.screenshot('dropdown-mobile-trigger-clicked');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('have.class', 'show').and('be.visible');
    cy.screenshot('dropdown-mobile-content-visible');
    cy.get('[data-cy="dropdown-first-item"]').should('be.visible');
  });

  // Add more tests for focus trap if needed
});
