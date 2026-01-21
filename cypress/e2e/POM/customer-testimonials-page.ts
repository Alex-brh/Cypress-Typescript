

export class CustomerTestimonialsPage {

    validateErrorMessages(options: { expectedText: Array<string> }): void {
        // Click the 'Submit comment' button when the form is not populated
        cy.clickSmart({ selector: 'button[name="submit"]', index: 0 });
        // Wait for the error messages to appear.
        cy.waitForPageToLoad();
        cy.validateElementText({
            selector: 'div[class="jw-element-form-error jw-comment-error"] > strong',
            expectedText: 'Oops! Something went wrong.'
        })
        cy.validateElementText({
            selector: 'div[class="jw-element-form-error jw-comment-error"]',
            expectedText: 'Check the following fields and try again:'
        })
        // Validate the error messages.
        const expectedText = options.expectedText
        cy.get('div[class="jw-element-form-error jw-comment-error"] > ul > li')
            .should('have.length', expectedText.length) // Ensure the count matches
            .each(($el, index) => {
                // Log the individual text.
                const text = $el.text().trim();
                cy.log(`Element at index ${index} has text: ${text}`);

                // Individual validation for each element.
                cy.wrap($el).should('have.text', expectedText[index]);
            })
            .then(($els) => {
                // Array validation.
                const actualText = Cypress._.map($els, 'innerText');
                expect(actualText).to.deep.equal(expectedText);
            });
    }

}