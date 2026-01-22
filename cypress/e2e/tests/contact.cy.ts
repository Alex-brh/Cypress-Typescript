import * as data from '../../fixtures/contact-data.json'
import { ContactPage } from '../POM/contact-page';
const contactPage = new ContactPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        cy.navigateToUrl('/contact');
        cy.url().should('include', '/contact', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('appearance of elements', () => {
        // Validate the page appearance.
        contactPage.validateContactPageAppearance(data);
    })

    it('that empty form is not getting submitted', () => {
        const errorMessage = 'Please fill out this field.'
        // Validate errors on an empty form submission.
        contactPage.validateEmptyFormSubmission({ error: errorMessage });
    })
});
