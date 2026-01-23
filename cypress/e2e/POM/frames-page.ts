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

    validateLinksWithShadowDom(frameData: { brand: string; href: string }[]): void {
        cy.wrap(frameData).each((frame: { brand: string; href: string }) => {
            // First count the number of iframe elements on the page.
            cy.get('div[class="iframely-embed"] > div').should('have.length', 6);
            // Get the link button inside the shadow DOM.
            cy.get('div[class="iframely-embed"] > div', { timeout: 7000 })
                .eq(frame.brand === "amazon" ? 0 : 5)
                .shadow()
                .find(`a[href="${frame.href}"]`)
                .first().as("linkButton");

            // Validate link button existence and visibility.   
            cy.get("@linkButton")
                .should("exist")
                .scrollIntoView({ timeout: 10000 })
                .should("be.visible");

            // Validate link button navigation.
            cy.get("@linkButton")
                .invoke('removeAttr', 'target') // Prevents opening in a new tab.
                .click({ force: true });
            // NOTE: Removed page URL validation, as Amazon returns an error intermittently.
            // Navigate back to blank page.
            cy.visit('about:blank');
            this.navigateToElementsWithFramesPage();
        });
    }
}