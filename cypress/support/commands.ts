// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export { }; // Marks this file as a module

/**
* Navigate to a URL and verify it.
* @example cy.navigateToUrl('/login')
*/
Cypress.Commands.add('navigateToUrl', (url: string) => {
    cy.visit(url);
    cy.url().should('include', url, { timeout: 10000 });
});

/**
 * Validate that an element contains the expected text.
 * @example cy.validateElementText('h1.title', 'Welcome')
 */
Cypress.Commands.add('validateElementText', (selector, expectedText) => {
    cy.get(selector).should('exist').scrollIntoView().should('have.text', expectedText);
});

declare global {
    namespace Cypress {
        interface Chainable {

            navigateToUrl(url: string): Chainable<void>;
            validateElementText(selector: string, expectedText: string): Chainable<void>;
        }
    }
}