import * as data from '../../fixtures/clearance-data.json'
import { ClearancePage } from '../POM/clearance-page';
const clearancePage = new ClearancePage();

describe('Test "Clearance" page by validating', () => {

    beforeEach(() => {
        cy.launchTheStore();
        // Clik the "Clearance" menu item.
        cy.clickSmart({ selector: 'a[href="/clearance"]', index: 0 });
        cy.url().should('include', '/clearance', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('h2 headers', () => {
        // Validate h2 headers.
        clearancePage.h2HeaderValidation(data);
    });

    it('paragraph texts', () => {
        // Validate paragraph texts.
        clearancePage.paragraphTextValidation(data);
    });

    it('buttons attributes', () => {
        // Validate buttons attributes.
        clearancePage.buttonsValidation();
    });

});
