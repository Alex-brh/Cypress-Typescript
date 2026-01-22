import * as data from '../../fixtures/customer-testimonials-data.json'
import { CustomerTestimonialsPage } from '../POM/customer-testimonials-page';
const customerTestimonialsPage = new CustomerTestimonialsPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        cy.navigateToUrl('/');
        cy.clickSmart({ selector: 'a[href="/customer-testimonials"]', index: 0 });
        cy.url().should('include', '/customer-testimonials', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('appearance of elements', () => {
        // Validate the page appearance.
        customerTestimonialsPage.validateElementAppearance(data);
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
    })

    it('error messages on an empty form submission', () => {

        // Validate the error messages.
        const expectedText = [
            'Name is a required field.',
            'Email address is a required field.',
            'Message is a required field.',
            'Field is required'
        ]
        customerTestimonialsPage.validateErrorMessages({ expectedText });

    })

});