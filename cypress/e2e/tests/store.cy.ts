import * as data from '../../fixtures/store-data.json'
import { StorePage } from '../POM/store-page';
const storePage = new StorePage();

describe('Testing the "Store" page by validating', () => {

    beforeEach(() => {
        cy.visit('/store');
        cy.waitForPageToLoad();
        cy.url().should('include', '/store', { timeout: 10000 });
    });

    it.only('the top disclaimer and the "Type here" button', () => {
        // Validate the top disclaimer text.
        cy.validateElementText({
            selector: 'div[class="jw-element-imagetext-text"] > p > span',
            expectedText: "It's being used for educational purposes ONLY. Nothing can be purchased and/or delivered through this website"
        });
        cy.validateElementText({
            selector: 'div[class="jw-element-imagetext-text"] > p > span',
            expectedText: "DISCLAIMER: This is NOT a real e-comm"
        });
        // Validate the "Type here" button text.
        cy.validateElementText({
            selector: 'a[class^="jw-element-content jw-btn"]',
            expectedText: "Type here"
        });
    });

    it('the presence of all product items on the Store page', () => {
        // Validate the presence of all product items on the Store page.
        storePage.validateStorePageProducts({ data: data });
    });

});