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
        // Validate the page appearance.
        contactPage.validateContactPageAppearance(data);
    })

    it('that empty form is not getting submitted', () => {
        cy.waitForElementVisible('button[type="submit"]', 0);
        cy.clickSmart({ selector: 'button[type="submit"]', index: 0 });
        cy.waitForPageToLoad();
        // Validate the page url.
        cy.url().should('include', '/contact', { timeout: 10000 });
        // Validate the browser native error message showing up under the 'Name *' input field.
        cy.get('input[type="text"]').eq(0)
            .should('exist')
            // Since Cypress yields a jQuery-wrapped object, you must cast it to JQuery<HTMLInputElement> to access the native HTMLInputElement and 
            // its properties with full IntelliSense support. 
            .then(($input: JQuery<HTMLInputElement>) => {
                // Access the native DOM element via index [0]
                const nativeElement = $input[0];
                // Verify the message content
                expect(nativeElement.validationMessage).to.equal('Please fill out this field.');
            });
    })
});