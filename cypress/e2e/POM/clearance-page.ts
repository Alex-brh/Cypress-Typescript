interface ClearancePageData {
    h2Headers: { text: string }[]
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
}