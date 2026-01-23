export class FramesPage {

    /**
     * Navigate to the "Elements with frames" page.
     * @returns void
     * @example cy.navigateToElementsWithFramesPage()
     */
    navigateToElementsWithFramesPage(): void {
        cy.launchTheStore();
        // Click the "Elements with frames" menu item.
        cy.clickSmart({ selector: 'a[href="/elements-with-frames"]', index: 0 });
        cy.url().should('include', '/elements-with-frames', { timeout: 10000 });
        cy.waitForPageToLoad();
    }
}