
export class HomePage {

    validateShopNowButtons(options: { buttonsCount: number }): void {
        for (let i = 0; i < options.buttonsCount; i++) { // There are 2 "Shop Now" buttons on the Home page.
            cy.get('a[class*="jw-btn"][href="/store"]').eq(i).should('exist')
                .scrollIntoView({ timeout: 10000 })
                .contains('shop now', { matchCase: false }) // Handles any casing
                .click({ force: true });
            cy.waitForPageToLoad();
            cy.url().should('include', '/store', { timeout: 10000 });
            // Go back to the Home page for the next iteration.
            cy.get('a[class^="jw-menu-link"][href="/"]').should('exist').scrollIntoView({ timeout: 10000 }).click({ force: true });
            cy.waitForPageToLoad();
            cy.url().should('include', '/', { timeout: 10000 });
        }
    }
}
