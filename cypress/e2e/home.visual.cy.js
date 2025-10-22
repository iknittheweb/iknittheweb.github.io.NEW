/// <reference types="cypress" />
import '@percy/cypress';

describe('Home Page Visual Regression', () => {
  it('should match the home page snapshot', () => {
    cy.visit('/dist/index.html');
    cy.wait(1000); // Wait for page to fully render
    cy.percySnapshot('Home Page');
  });
});
