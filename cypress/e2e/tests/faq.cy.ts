// One way to import data from fixture files.
import * as data from '../../fixtures/faq-data.json'
import { HomePage } from '../POM/home-page';
const homePage = new HomePage();

describe('Test "FAQ" page by validating', () => {
    // Another way to import data from fixture files.
    const homeData = require('../../fixtures/home-data.json');

    beforeEach(() => {
        cy.navigateToUrl('/faq');
        cy.waitForPageToLoad();
        cy.url().should('include', '/faq', { timeout: 10000 });
    });

    it('URL and title', () => {
        cy.validateElementText({ selector: 'div[class="jw-element-imagetext-text"] > p', index: 0, expectedText: data.faqs[0].question });
    })

});