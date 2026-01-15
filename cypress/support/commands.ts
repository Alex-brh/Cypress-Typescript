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

import { Chainable } from 'cypress';

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
 * Validate that an element contains the expected text (eleement index is optional and defaults to 0).
 * @example cy.validateElementText('h1.title', 'Welcome')
 * @example cy.validateElementText('h1.title', 0, 'Welcome')
 */
Cypress.Commands.add('validateElementText', ({ selector, index = 0, expectedText }) => {
    if (index !== undefined) {
        cy.get(selector).eq(index).should('exist').scrollIntoView({ timeout: 10000 }).should('have.text', expectedText);
    } else {
        cy.get(selector).should('exist').scrollIntoView({ timeout: 10000 }).should('have.text', expectedText);
    }
});

/**
 * Validate element attribute with OR without expected value.
 * @example cy.validateElementAttribute('a.link', 'href')
 * @example cy.validateElementAttribute('a.link', 0, 'href')
 * @example cy.validateElementAttribute('a.link', 0, 'href', '/home')
 */
Cypress.Commands.add('validateElementAttribute', ({selector, index = 0, attribute, expectedValue}) => {
    // Start the command chain
    const element = cy.get(selector).eq(index).should('exist').scrollIntoView({ timeout: 10000 });

    if (expectedValue !== undefined) {
        // Assert that the attribute equals the specific value
        element.should('have.attr', attribute, expectedValue);
    } else {
        // Only assert that the attribute exists
        element.should('have.attr', attribute);
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
            validateElementText(options: { selector: string, index?: number, expectedText: string }): Chainable<void>;
            validateElementAttribute(options: {
                selector: string;
                index?: number; // Optional
                attribute: string;
                expectedValue?: string; // Optional
            }): Chainable<void>;
            waitForPageToLoad(): Chainable<void>;
        }
    }
}