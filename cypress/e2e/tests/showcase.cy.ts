import * as data from '../../fixtures/showcase-data.json'
import { ShowcasePage } from '../POM/showcase-page';
const showcasePage = new ShowcasePage();

describe('Test "Showcase" page by validating', () => {

    beforeEach(() => {
        cy.launchTheStore();
        // Clik the "Showcase" menu item.
        cy.clickSmart({ selector: 'a[href="/showcase"]', index: 0 });
        cy.url().should('include', '/showcase', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('h2 headers', () => {
        // Validate h2 headers.
        showcasePage.h2HeaderValidation(data);
    })

    it('each paragraph text', () => {
        // Validate each paragraph text.
        cy.wrap(data.paragraphs).each((paragraph: { paragraphText: string }, index) => {
            cy.validateElementText({ selector: 'p', index: index, expectedText: paragraph.paragraphText });
        });
    });

    it('each image on the page', () => {
        // Validate each image attribute.
        cy.wrap(data.images).each((image: { attribute: string }, index) => {
            cy.validateElementAttribute({ selector: 'img[class^="jw-element-image__image"]', index: index, attribute: image.attribute });
        });
    });
});