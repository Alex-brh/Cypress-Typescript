interface ShowCasePageData {
    h2Headers: { text: string }[]
}

export class ShowcasePage {

    /**
     * Navigate to the "Showcase" page.
     * @returns void
     * @example cy.navigateToShowcasePage()
     */
    navigateToShowcasePage(): void {
        cy.launchTheStore();
        cy.clickSmart({ selector: 'a[href="/showcase"]', index: 0 });
        cy.url().should('include', '/showcase', { timeout: 10000 });
        cy.waitForPageToLoad();
    }

    /**
     * Validate h2 headers on the "Showcase" page.
     * @param data 
     * @returns void
     * @example cy.h2HeaderValidation(data)
     */
    h2HeaderValidation(data: ShowCasePageData): void {
        cy.wrap(data.h2Headers).each((headerText, index) => {
            cy.validateElementText({
                selector: 'h2[class^="jw-heading"]',
                index: index,
                expectedText: headerText.text as unknown as string
            });
        })
    }
}