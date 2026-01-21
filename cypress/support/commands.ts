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

Cypress.Commands.add('waitForElementVisible', (locator: string, index: number = 0, options: Partial<Cypress.Loggable & Cypress.Timeoutable> = {}) => {
    // Enhanced logging for the Cypress Command Log
    const log = Cypress.log({
        name: 'waitForVisible',
        displayName: 'WAIT VISIBLE',
        message: [locator],
        autoEnd: false,
    });

    // 1. cy.get() retries until the element is attached to the DOM
    // 2. .should('be.visible') retries until the element is actually visible to the user
    return cy.get(locator, { ...options, log: false })
        .eq(index)
        .should('be.visible')
        .then(($el) => {
            log.set({ $el }).end();
            return $el; // Yields the element for further chaining
        });
});

Cypress.Commands.add('clickSmart', ({ selector, index = 0 }) => {
    Cypress.log({
        displayName: 'clickSmart',
        message: `Clicking element with selector: ${selector}, index: ${index}`,
        consoleProps: () => ({ selector, index }),
    })
    cy.get(selector).eq(index).should('exist').scrollIntoView({ timeout: 10000 }).click({ force: true });
});

Cypress.Commands.add('navigateToUrl', (url: string) => {
    Cypress.log({
        displayName: 'navigateToUrl',
        message: `Navigating to URL: ${url}`,
        consoleProps: () => ({ url }),
    })
    cy.visit(url);
    cy.url().should('include', url, { timeout: 10000 });
});

Cypress.Commands.add('validateElementText', ({ selector, index = 0, expectedText }) => {
    Cypress.log({
        displayName: 'validateElementText',
        message: `Validating text for selector: ${selector}, index: ${index}, expectedText: ${expectedText}`,
        consoleProps: () => ({ selector, index, expectedText }),
    });
    if (index !== undefined) {
        cy.get(selector).eq(index).should('exist').scrollIntoView({ timeout: 10000 }).should('contain.text', expectedText);
    } else {
        cy.get(selector).should('exist').scrollIntoView({ timeout: 10000 }).should('contain.text', expectedText);
    }
});

Cypress.Commands.add('validateElementAttribute', ({ selector, index = 0, attribute, expectedValue }) => {
    Cypress.log({
        displayName: 'validateElementAttribute',
        message: `Validating attribute for selector: ${selector}, index: ${index}, attribute: ${attribute}, expectedValue: ${expectedValue}`,
        consoleProps: () => ({ selector, index, attribute, expectedValue }),
    })
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

Cypress.Commands.add('waitForPageToLoad', () => {
    Cypress.log({
        displayName: 'waitForPageToLoad',
        message: 'Waiting for page to load completely',
        consoleProps: () => ({}),
    });
    cy.document().should((doc) => {
        expect(doc.readyState).to.be.oneOf(['interactive', 'complete']);
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
           /**
           * Custom command to wait for an element to be attached to the DOM and become visible.
           * @param locator - CSS selector for the element
           * @param index - Optional: Index of the element
           * @param options - Optional: Override timeout or other Cypress options
           * @example cy.waitForVisible('.submit-btn')
           */
            waitForElementVisible(
                locator: string,
                index?: number,
                options?: Partial<Cypress.Loggable & Cypress.Timeoutable>
            ): Chainable<JQuery<HTMLElement>>;
            /**
            * Click an element with a smart scroll and force click.
            * @param selector The CSS selector of the element.
            * @param index (Optional) The index of the element if multiple elements match the selector.
            * @example cy.clickSmart({ selector: 'a.link' })
            * @example cy.clickSmart({ selector: 'a.link', index: 1 })
            */
            clickSmart(options: { selector: string, index?: number }): Chainable<void>;
            /**
            * Navigate to a URL and verify it.
            * @param url The URL to navigate to.
            * @example cy.navigateToUrl('/login')
            */
            navigateToUrl(url: string): Chainable<void>;
            /**
            * Validate that an element contains the expected text (eleement index is optional and defaults to 0).
            * @param selector The CSS selector of the element.
            * @param index (Optional) The index of the element if multiple elements match the selector.
            * @param expectedText The expected text content of the element.
            * @example cy.validateElementText({ selector: 'h1.title', expectedText: 'Welcome' })
            * @example cy.validateElementText({ selector: 'h1.title', index: 0, expectedText: 'Welcome' })
            */
            validateElementText(options: { selector: string, index?: number, expectedText: string | JQuery<HTMLElement> }): Chainable<void>;
            /**
             * Validate element attribute with OR without expected value.
             * @param selector The CSS selector of the element.
             * @param index (Optional) The index of the element if multiple elements match the selector.
             * @param attribute The attribute to validate.
             * @param expectedValue (Optional) The expected value of the attribute.
             * @example cy.validateElementAttribute({ selector: 'a.link', attribute: 'href' })
             * @example cy.validateElementAttribute({ selector: 'a.link', index: 0, attribute: 'href' })
             * @example cy.validateElementAttribute({ selector: 'a.link', index: 0, attribute: 'href', expectedValue: '/home' })
             */
            validateElementAttribute(options: {
                selector: string;
                index?: number; // Optional
                attribute: string;
                expectedValue?: string; // Optional
            }): Chainable<void>;
            /**
            * Wait for the page to load.
            * @param none
            * @example cy.waitForPageLoad()
            */
            waitForPageToLoad(): Chainable<void>;
        }
    }
}