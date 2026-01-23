import * as data from '../../fixtures/frames-data.json'
import { FramesPage } from '../POM/frames-page';
const framesPage = new FramesPage();

describe('Test "Customer Testimonials" page by validating', () => {

    beforeEach(() => {
        // Navigate to the Contact page before each test.
        framesPage.navigateToElementsWithFramesPage();
    });

    it('shadow DOM - amazon link', () => {

        const frameData = [
            { brand: "amazon", href: "https://www.amazon.com" }
        ]
        // Validate the page appearance.
        cy.wrap(frameData).each((frame: { brand: string; href: string }) => {
            cy.get("div", { timeout: 7000 })
                .shadow()
                .find(`a[href="${frame.href}"]`)
                .first().as("linkButton");

            cy.get("@linkButton")
                .should("exist")
                .scrollIntoView({ timeout: 10000 })
                .should("be.visible");

            cy.get("@linkButton")
                .invoke('removeAttr', 'target') // Prevents opening in a new tab
                .click({ force: true });
            cy.url().should('include', frame.brand, { timeout: 10000 });
        });
    });
});