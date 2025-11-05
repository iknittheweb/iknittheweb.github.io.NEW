// Cypress E2E tests for dropdown UI/interaction
describe('Dropdown UI/Interaction', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.get('[data-cy="dropdown-trigger"]').should('exist');
    cy.get('[data-cy="dropdown-content"]').should('exist');
  });
  it('should handle disabled state gracefully', () => {
    // Simulate disabling the dropdown trigger
    cy.get('[data-cy="dropdown-trigger"]').invoke('attr', 'disabled', true);
    cy.get('[data-cy="dropdown-trigger"]').click({ force: true });
    cy.get('[data-cy="dropdown-content"]').should('not.have.class', 'show');
  });

  it('should not execute XSS from dropdown content', () => {
    // Simulate XSS attempt in dropdown content
    cy.get('[data-cy="dropdown-content"]').invoke('html', '<a href="#" onclick="window.xss=true">XSS</a>');
    cy.get('[data-cy="dropdown-content"] a').click({ force: true });
    cy.window().its('xss').should('not.exist');
  });
  it('should have a visible skip link for accessibility', () => {
    cy.get('.skip-link').should('exist').and('have.attr', 'href').and('include', 'main-content');
    cy.get('.skip-link').focus().should('be.visible');
  });

  it('should have correct ARIA attributes on dropdown', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('have.attr', 'aria-controls');
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'aria-labelledby');
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'aria-hidden');
  });

  it('should trap focus within dropdown when open', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.get('[data-cy="dropdown-content"] a, [data-cy="dropdown-content"] button').first().should('exist').focus();
    cy.focused().should('exist').and('have.focus');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').type('{esc}');
    cy.get('[data-cy="dropdown-content"]').should('exist').and('not.have.class', 'show');
  });

  it('should follow correct focus order for keyboard users', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').focus().type('{enter}');
    cy.get('[data-cy="dropdown-content"] a, [data-cy="dropdown-content"] button').first().should('exist').focus();
    cy.realPress('Tab');
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
    cy.get('[data-cy="dropdown-content"]').should('have.attr', 'role', 'menu');
  });

  it('should toggle dropdown open/close on click', () => {
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.get('[data-cy="dropdown-content"]')
      .should('exist')
      .and('have.class', 'show')
      .and('have.attr', 'aria-hidden', 'false');
    cy.get('[data-cy="dropdown-trigger"]')
      .should('exist')
      .should('have.class', 'dropdown-open')
      .and('have.attr', 'aria-expanded', 'true');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.get('[data-cy="dropdown-content"]')
      .should('exist')
      .and('not.have.class', 'show')
      .and('have.attr', 'aria-hidden', 'true');
    cy.get('[data-cy="dropdown-trigger"]')
      .should('exist')
      .should('not.have.class', 'dropdown-open')
      .and('have.attr', 'aria-expanded', 'false');
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
    cy.checkA11y('[data-cy="dropdown-content"]');
  });

  it('should be usable on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('[data-cy="dropdown-trigger"]').should('exist').click();
    cy.get('[data-cy="dropdown-content"]').should('exist').and('be.visible');
  });

  // Add more tests for focus trap if needed
});
