interface ClearancePageData {
    h2Headers: { text: string }[];
    paragraphs: { text: string }[];
}

export class ClearancePage {

    /**
     * Navigate to the "Clearance" page.
     * @returns void
     * @example cy.navigateToClearancePage()
     */
    navigateToClearancePage(): void {
        cy.launchTheStore();
        // Clik the "Clearance" menu item.
        cy.clickSmart({ selector: 'a[href="/clearance"]', index: 0 });
        cy.url().should('include', '/clearance', { timeout: 10000 });
        cy.waitForPageToLoad();
    }

    /**
     * Validate h2 headers on the "Clearance" page.
     * @param data 
     * @returns void
     * @example cy.h2HeaderValidation(data)
     */
    h2HeaderValidation(data: ClearancePageData): void {
        cy.wrap(data.h2Headers).each((headerText, index) => {
            cy.validateElementText({
                selector: 'h2[class^="jw-heading"]',
                index: index,
                expectedText: headerText.text as unknown as string
            });
        })
    }

    /**
     * Validate paragraph texts on the "Clearance" page.
     * @param data 
     * @returns void
     * @example cy.paragraphTextValidation(data)
     */
    paragraphTextValidation(data: ClearancePageData): void {
        cy.wrap(data.paragraphs).each((paragraph, index) => {
            cy.validateElementText({
                selector: 'div[class="jw-element-imagetext-text"] > p',
                index: index,
                expectedText: paragraph.text as unknown as string
            });
        })
    }

    /**
     * Validate buttons on the "Clearance" page.
     * @returns void
     * @example cy.buttonsValidation()
     */
    buttonsValidation(): void {
        // Validate the "Contact us" button attributes.
        cy.validateElementAttribute({
            selector: 'a[title="Contact"]',
            attribute: "href",
            expectedValue: "/contact"
        });
        cy.validateElementText({
            selector: 'a[title="Contact"] > span',
            expectedText: "Contact us"
        });
        // Validate the 'Let's get started' button attributes.
        cy.validateElementAttribute({
            selector: 'a[title="Home"]',
            attribute: "href",
            expectedValue: "/"
        });
        cy.validateElementText({
            selector: 'a[title="Home"] > span',
            expectedText: "Let's get started"
        });

    }
}