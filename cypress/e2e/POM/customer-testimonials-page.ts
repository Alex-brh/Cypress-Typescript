
interface data {
    testimonials: { text: string }[];
    fieldLabels: { label: string }[];
}
export class CustomerTestimonialsPage {

    /**
     * Navigate to the "Customer Testimonials" page.
     * @returns void
     * @example cy.navigateToCustomerTestimonialsPage()
     */
    navigateToCustomerTestimonialsPage(): void {
        cy.launchTheStore();
        cy.clickSmart({ selector: 'a[href="/customer-testimonials"]', index: 0 });
        cy.url().should('include', '/customer-testimonials', { timeout: 10000 });
        cy.waitForPageToLoad();
    }

    /**
     * Validate the error messages.
     * @param options
     * @param options.expectedText
     * @returns void
     * @example cy.validateErrorMessages({ expectedText: ['Name is a required field.', 'Email address is a required field.', 'Message is a required field.', 'Field is required'] })
     */
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

    /**
     * Validate the page appearance.
     * @param data
     * @returns void
     * @example cy.validateElementAppearance(data)
     */
    validateElementAppearance(data: data): void {
        // Validate the top image visibility.
        cy.validateElementAttribute({
            selector: 'img[class^="jw-element-image__image"]',
            attribute: 'src'
        });
        // Validate h2 headers.
        const headers = [
            "Testimonials",
            "Add comment",
            "Comments"
        ];
        // Validate each h2 header.
        cy.wrap(headers).each((headerText, index) => {
            cy.validateElementText({
                selector: 'div > h2',
                index: index,
                expectedText: headerText
            });
        });
        // Validate each testimonial text against the data file.
        cy.wrap(data.testimonials).each((testimonial, index) => {
            // Select the locator based on the index threshold
            const selector = index < 7
                ? 'div.jw-element-imagetext-text > p'
                : 'div.jw-element-imagetext-text > p > span';

            cy.validateElementText({
                selector: selector,
                index: index < 7 ? index : 0, // Reset index to 0 for the alternative selector
                expectedText: data.testimonials[index].text as unknown as string // Cast to string to avoid Cypress type error.
            });
        });
    }

    /**
     * Validate the add comment section appearance.
     * @param data
     * @returns void
     * @example cy.validateAddCommentSectionAppearance(data)
     */
    validateAddCommentSectionAppearance(data: data): void {
        // Validate input fields labels appearance.
        data.fieldLabels.forEach((fieldLabel, index) => {
            cy.validateElementText({
                selector: 'label[class="jw-element-form-label"]',
                index: index,
                expectedText: fieldLabel.label
            });
        })
        const attributes = [
            { name: 'name' },
            { name: 'email' },
            { name: 'body' }
        ];
        // Validate each attribute.
        cy.wrap(attributes).each((item: any) => {
            // Destructure the 'name' property.
            const { name } = item;
            // The 'body' field is a textarea.
            const selector = name === 'body' ? 'textarea[name="body"]' : `input[name="${name}"]`;
            cy.validateElementAttribute({
                selector,
                attribute: 'id'
            });
        });
        // Validate the 'Submit comment' button appearance.
        cy.validateElementText({
            selector: 'button[name="submit"]',
            expectedText: 'Submit comment'
        });
    }
}