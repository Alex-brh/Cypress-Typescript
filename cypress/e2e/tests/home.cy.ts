// One way to import data from fixture files.
import * as data from '../../fixtures/home-data.json'

describe('Test "Home" page by', () => {
    // Another way to import data from fixture files.
    const homeData = require('../../fixtures/home-data.json');

    beforeEach(() => {
        cy.navigateToUrl('https://free-5288352.webadorsite.com/');
    });

    it('validating its URL and title', () => {
        cy.validateElementText({selector: 'h1[id="jw-header-title"] > span', index: 0, expectedText: homeData.pageTitle});
    })

    it('validating headers h1 contents', () => {
        cy.wrap(homeData.header1).each((item: any, i) => {
            cy.log(`Validating: ${item.headerText}`);
            cy.validateElementText({selector: 'h1[class^="jw-heading"]', index: i, expectedText: item.headerText});
        });
    })

});