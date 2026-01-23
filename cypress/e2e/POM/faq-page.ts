
// Define the interface for the options object.
interface FaqData {
    faqsData: { locator: string; index?: number; question?: string; answer?: string };
}

export class FaqPage {

    /**
     * Navigate to the "FAQ" page.
     * @returns void
     * @example cy.navigateToFaqPage()
     */
    navigateToFaqPage(): void {
        cy.launchTheStore();
        cy.clickSmart({ selector: 'a[href="/faq"]', index: 0 });
        cy.url().should('include', '/faq', { timeout: 10000 });
        cy.waitForPageToLoad();
    }

    validateTopQuestionAndAnswer(options: FaqData): void {
        // Validate the top question and/or answer based on provided options.
        if (options.faqsData.locator &&
            options.faqsData.index !== undefined &&
            (options.faqsData.question !== undefined || options.faqsData.answer !== undefined)) {
            // Validate question if provided.
            if (options.faqsData.question !== undefined) {
                cy.validateElementText({ selector: options.faqsData.locator, index: options.faqsData.index, expectedText: options.faqsData.question });
            }
            // Validate answer if provided.
            if (options.faqsData.answer !== undefined) {
                cy.validateElementText({ selector: options.faqsData.locator, index: options.faqsData.index, expectedText: options.faqsData.answer });
            }
        } else {
            throw new Error('Invalid parameters provided to validateTopQuestionAndAnswer method.');
        }
    }

}