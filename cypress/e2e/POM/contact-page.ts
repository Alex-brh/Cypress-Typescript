
interface ContactPageData {
    // Define the interface for the options object.
    fieldLabels: { label: string }[];
}
interface FormOptions {
    error: string;
}
export class ContactPage {

    /**
     * Navigate to the Contact page.
     * @returns void
     * @example cy.navigateToContactPage()
     */
    navigateToContactPage(): void {
        cy.launchTheStore();
        cy.clickSmart({ selector: 'a[href="/contact"]', index: 0 });
        cy.url().should('include', '/contact', { timeout: 10000 });
        cy.waitForPageToLoad();
    }

    /**
     * Validate the Contact page appearance based on provided data.
     * @param data - The data object containing field labels.
     * @returns void
     * @example cy.validateContactPageAppearance({ fieldLabels: [{ label: 'Name' }, { label: 'Email' }, { label: 'Message' }] })
     */
    validateContactPageAppearance(data: ContactPageData): void {
        // Validate the top disclaimer visibility.
        cy.validateElementText({
            selector: 'div[class="jw-element-imagetext-text"] > p > span',
            expectedText: "DISCLAIMER: This is NOT a real e-comm website. It's being used for educational purposes ONLY. No real items can be purchased and/or delivered through this website."
        });
        // Validate the 'Contact us' h2 header.
        cy.validateElementText({
            selector: 'h2[class^="jw-heading"]',
            expectedText: "Contact us"
        })
        // Validate statement under header.
        cy.validateElementText({
            selector: 'div[class="jw-element-imagetext-text"] > p',
            index: 1,
            expectedText: "Have questions? We're here to help! Contact us anytime."
        })
        // Validate each label.
        cy.wrap(data.fieldLabels).each((fieldLabels, index) => {
            cy.validateElementText({
                selector: 'label[class="jw-element-form-label"]',
                index: index,
                // Define the expected text as the label from the data file.
                expectedText: (fieldLabels as unknown as { label: string }).label
            });
        });
        // Validate the input fields existence.
        const attributes = [
            { tag: 'input' },
            { tag: 'input' },
            { tag: 'textarea' }
        ];
        // Validate each attribute.
        cy.wrap(attributes).each((item: any, index: number) => {
            // Destructure the 'name' property.
            const { tag } = item;
            // The 'body' field is a textarea.
            const selector = tag === 'textarea' ? 'textarea[class*="jw-element-form-input-text"]' : `input[type="text"]:eq(${index})`;
            cy.validateElementAttribute({
                selector,
                attribute: 'id'
            });
        });
        // Validate the 'Submit form' button appearance.
        cy.validateElementText({
            selector: 'button[type="submit"]',
            expectedText: 'Submit form'
        });
        // Validate the map appearance.
        cy.validateElementAttribute({
            selector: 'div[class^="jw-map-wrapper"] > div',
            attribute: 'id'
        });
    }

    /**
     * Validate the empty form submission behavior.
     * @param validation - The validation object containing the expected error message.
     * @returns void
     * @example cy.validateEmptyFormSubmission({ error: 'Please fill out this field.' })
     */
    validateEmptyFormSubmission(validation: FormOptions): void {
        cy.waitForElementVisible('button[type="submit"]', 0);
        cy.clickSmart({ selector: 'button[type="submit"]', index: 0 });
        cy.waitForPageToLoad();
        // Validate the page url.
        cy.url().should('include', '/contact', { timeout: 10000 });
        // Validate the browser native error message showing up under the 'Name *' input field.
        cy.get('input[type="text"]').eq(0)
            .should('exist')
            // Since Cypress yields a jQuery-wrapped object, we must cast it to JQuery<HTMLInputElement> to access the native HTMLInputElement and 
            // its properties with full IntelliSense support.
            .then(($input: JQuery<HTMLInputElement>) => {
                // Access the native DOM element via index [0]
                const nativeElement = $input[0];
                // Verify the message content
                expect(nativeElement.validationMessage).to.equal(validation.error);
            });
    }
}