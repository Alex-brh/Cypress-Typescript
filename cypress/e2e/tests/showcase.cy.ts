import * as data from '../../fixtures/showcase-data.json'
import { ShowcasePage } from '../POM/showcase-page';
const showcasePage = new ShowcasePage();

describe('Test "Showcase" page by validating', () => {

    beforeEach(() => {
        cy.launchTheStore();
        cy.clickSmart({ selector: 'a[href="/showcase"]', index: 0 });
        cy.url().should('include', '/showcase', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('h2 headers', () => {
        // Validate h2 headers.
        showcasePage.h2HeaderValidation(data);
    })

});