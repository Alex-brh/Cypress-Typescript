import * as data from '../../fixtures/customer-testimonials-data.json'
import { CustomerTestimonialsPage } from '../POM/customer-testimonials-page';
const customerTestimonialsPage = new CustomerTestimonialsPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        cy.navigateToUrl('/customer-testimonials');
        cy.waitForPageToLoad();
        cy.url().should('include', '/customer-testimonials', { timeout: 10000 });
    });

    it('appearance of elements', () => {
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
        headers.forEach((headerText, index) => {
            cy.validateElementText({
                selector: 'div > h2',
                index: index,
                expectedText: headerText
            });
        });
        // Validate each testimonial text against the data file.
        data.testimonials.forEach((testimonial, index) => {
            if (index < 7) {
                cy.validateElementText({
                    selector: 'div[class="jw-element-imagetext-text"] > p',
                    index: index,
                    expectedText: testimonial.text
                });
            }
            else {
                cy.validateElementText({
                    // This has a different CSS locator. Hence using the method deafault index, which is zero.
                    selector: 'div[class="jw-element-imagetext-text"] > p > span',
                    expectedText: testimonial.text
                });
            }
        });

    })

});