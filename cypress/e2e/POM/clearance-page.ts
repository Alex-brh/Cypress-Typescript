interface ClearancePageData {
    h2Headers: { text: string }[];
    paragraphs: { text: string }[];
}

export class ClearancePage {

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
}