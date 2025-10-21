/// <reference types="cypress" />
import 'cypress-image-snapshot/command';

describe('Home Page Visual Regression', () => {
  it('should match the home page snapshot', () => {
    cy.visit('/index.html');
    cy.wait(1000); // Wait for page to fully render
    cy.document().toMatchImageSnapshot();
  });
});
