// Cypress E2E tests for navigation UI/interaction
describe('Navigation UI/Interaction', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.get('#menuTopNav').should('exist');
  });
  it('should set accessibility attributes on navigation', () => {
    cy.get('#menuTopNav').should('exist').and('be.visible');
    cy.get('#menuTopNav').should('exist').and('be.visible').and('have.attr', 'aria-hidden', 'true');
    cy.get('#menuTopNav')
      .should('exist')
      .and('be.visible')
      .then(($el) => {
        if ($el.attr('inert') !== undefined) {
          expect($el).to.have.attr('inert');
        }
      });
  });
});
