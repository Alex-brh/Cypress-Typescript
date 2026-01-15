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
import type { Chainable } from "cypress";

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
 * @example cy.validateElementText('h1.title', 0, 'Welcome')
 * @example cy.validateElementText('h1.title', 'Welcome')
 */
Cypress.Commands.add('validateElementText', ({selector, index, expectedText}: {selector: string, index?: number, expectedText: string}) => {
    if (index !== undefined) {
        cy.get(selector).eq(index).should('exist').scrollIntoView({ timeout: 10000 }).should('have.text', expectedText);
    } else {
        cy.get(selector).should('exist').scrollIntoView({ timeout: 10000 }).should('have.text', expectedText);
    }
});

/**
 * Wait for the page to load.
 * @example cy.waitForPageLoad()
 * 
 */
Cypress.Commands.add('waitForPageToLoad', () => {
    cy.document().should((doc) => {
        expect(doc.readyState).to.be.oneOf(['interactive', 'complete']);
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            navigateToUrl(url: string): Chainable<void>;
            validateElementText({selector, index, expectedText}: {selector: string, index: number, expectedText: string}): Chainable<void>;
            waitForPageToLoad(): Chainable<void>;
        }
    }
}