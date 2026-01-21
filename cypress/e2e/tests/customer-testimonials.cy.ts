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
            // Select the locator based on the index threshold
            const selector = index < 7
                ? 'div.jw-element-imagetext-text > p'
                : 'div.jw-element-imagetext-text > p > span';

            cy.validateElementText({
                selector: selector,
                index: index < 7 ? index : 0, // Reset index to 0 for the alternative selector
                expectedText: testimonial.text
            });
        });
    })

    it('the "Add comment" section appearance', () => {
        // Validate input fields labels appearance.
        data.fieldLabels.forEach((fieldLabel, index) => {
            cy.validateElementText({
                selector: 'label[class="jw-element-form-label"]',
                index: index,
                expectedText: fieldLabel.label
            });
        })
        // Validate input fields appearance.
        const attributes = [
            { name: 'name' },
            { name: 'email' },
            { name: 'body' }
        ];

        attributes.forEach(({ name }) => {
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
    })

    it('error messages on an empty form submission', () => {
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
        const expectedText = [
            'Name is a required field.',
            'Email address is a required field.',
            'Message is a required field.',
            'Field is required'
        ]
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
        // Validate the captcha presence.
        cy.validateElementAttribute({
            selector: 'iframe[title="reCAPTCHA"]',
            attribute: 'name'
        })
    })

});