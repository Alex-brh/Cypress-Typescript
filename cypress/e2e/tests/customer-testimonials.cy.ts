import * as data from '../../fixtures/customer-testimonials-data.json'
import { CustomerTestimonialsPage } from '../POM/customer-testimonials-page';
const customerTestimonialsPage = new CustomerTestimonialsPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        // Navigate to the "Customer Testimonials" page.
        customerTestimonialsPage.navigateToCustomerTestimonialsPage();
    });

    it('appearance of elements', () => {
        // Validate the page appearance.
        customerTestimonialsPage.validateElementAppearance(data);
    })

    it('the "Add comment" section appearance', () => {
        // Validate input fields labels appearance.
        customerTestimonialsPage.validateAddCommentSectionAppearance(data);
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