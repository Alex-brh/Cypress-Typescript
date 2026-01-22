// One way to import data from fixture files.
import * as data from '../../fixtures/faq-data.json'
import { FaqPage } from '../POM/faq-page';
const faqPage = new FaqPage();

describe('Test "FAQ" page by validating', () => {

    beforeEach(() => {
        cy.navigateToUrl('/faq');
        cy.url().should('include', '/faq', { timeout: 10000 });
        cy.waitForPageToLoad();
    });

    it('URL and page top question and answer', () => {
        // Validate the top question.
        faqPage.validateTopQuestionAndAnswer({ faqsData: { locator: 'div[class="jw-element-imagetext-text"] > p', index: 0, question: data.faqs[0].question } });
        // Validate the top answer.
        faqPage.validateTopQuestionAndAnswer({ faqsData: { locator: 'div[class="jw-element-imagetext-text"]', index: 0, answer: data.faqs[0].answer } });
    })

    it('each question and answer text', () => {
        cy.wrap(data.textInClosedSections).each((faq, index) => {
            // Click a caret to expand the question/answer.
            cy.clickSmart({ selector: 'i[class="jw-element-accordion__icon website-rendering-icon-right-open"]', index: index });
            // Validate the answer text.
            cy.validateElementText({
                selector: 'div[class="jw-element-accordion__content-wrap"] > p > span',
                index: index,
                // Define the expected text as the question from the data file.
                expectedText: (faq as unknown as { question: string }).question as unknown as string
            });
        });
    });

    it('image visibility', () => {
        cy.validateElementAttribute({
            selector: 'img[class^="jw-element-image__image"]',
            attribute: 'src'
        });
    });

    it('Webador banner visibility', () => {
        cy.validateElementText({
            selector: 'div[class="jw-comment"] > h3',
            index: 0,
            expectedText: 'Create Your Own Website With'
        });
    });

});