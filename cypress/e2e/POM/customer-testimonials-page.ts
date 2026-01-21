

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
            .then(($els) => {
                // Get the text content of each element.
                const actualText = Cypress._.map($els, 'innerText');
                // Log the text content.
                cy.wrap(actualText).then((arr) => {
                    cy.log(JSON.stringify(arr));
                });
                // Validate the text content.
                expect(actualText).to.have.members(expectedText);
                expect(actualText).to.deep.equal(expectedText);
            });
    }

}