
interface ContactPageData {
 // Define the interface for the options object.
  fieldLabels: { label: string }[];
}
export class ContactPage {

    validateContactPageAppearance(data : ContactPageData): void {
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

}