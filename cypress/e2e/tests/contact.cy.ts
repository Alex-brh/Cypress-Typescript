import * as data from '../../fixtures/contact-data.json'
import { ContactPage } from '../POM/contact-page';
const contactPage = new ContactPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        cy.navigateToUrl('/contact');
        cy.waitForPageToLoad();
        cy.url().should('include', '/contact', { timeout: 10000 });
    });

    it('appearance of elements', () => {
        // Validate the top disclaimer visibility.
        cy.validateElementText({
            selector: 'div[class="jw-element-imagetext-text"] > p > span',
            expectedText: "DISCLAIMER: This is NOT a real e-comm website. It's being used for educational purposes ONLY. No real items can be purchased and/or delivered through this website."
        });
        // Validate each label.
        cy.wrap(data.fieldLabels).each((fieldLabels, index) => {
            cy.validateElementText({
                selector: 'label[class="jw-element-form-label"]',
                index: index,
                // Define the expected text as the label from the data file.
                expectedText: (fieldLabels as unknown as { label: string }).label
            });
        });
    });
});