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

    it('URL and page top question and answer', () => {
        // Validate the top question.
        cy.validateElementText({ selector: 'div[class="jw-element-imagetext-text"] > p', index: 0, expectedText: data.faqs[0].question });
        // Validate the top answer.
        cy.validateElementText({ selector: 'div[class="jw-element-imagetext-text"]', index: 0, expectedText: data.faqs[0].answer });
    })

    it('each question and answer text', () => {
        data.textInClosedSections.forEach((faq, index) => {
            // Click a caret to expand the question/answer.
            cy.clickSmart({ selector: 'i[class="jw-element-accordion__icon website-rendering-icon-right-open"]', index: index });
            // Validate the answer text.
            cy.validateElementText({ selector: 'div[class="jw-element-accordion__content-wrap"] > p > span', index: index, expectedText: faq.question });
        });
    });

});