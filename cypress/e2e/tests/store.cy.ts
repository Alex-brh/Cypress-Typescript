import * as data from '../../fixtures/store-data.json'
import { StorePage } from '../POM/store-page';
const storePage = new StorePage();

describe('Testing the "Store" page by validating', () => {

    beforeEach(() => {
        cy.visit('/store');
        cy.waitForPageToLoad();
        cy.url().should('include', '/store', { timeout: 10000 });
    });

    it('the presence of all product items on the Store page', () => {
        // Validate the presence of all product items on the Store page.
        storePage.validateStorePageProducts({ data: data });
    });

});