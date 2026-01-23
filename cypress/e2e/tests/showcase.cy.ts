import * as data from '../../fixtures/showcase-data.json'
import { ShowcasePage } from '../POM/showcase-page';
const showcasePage = new ShowcasePage();

describe('Test "Showcase" page by validating', () => {

    beforeEach(() => {
        cy.launchTheStore();
        // Navigate to the "Showcase" page.
        showcasePage.navigateToShowcasePage();
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

    it('the "Explore products" button', () => {
        // Validate the "Explore products" button.
        cy.validateElementAttribute({ selector: 'a[href="/store"]', index: 1, attribute: 'title', expectedValue: 'Store' });
        cy.validateElementText({ selector: 'a[href="/store"] > span', index: 2, expectedText: 'Explore products' });
    });
});