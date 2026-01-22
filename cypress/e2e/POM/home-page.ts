
interface data {
    topBarMenuItems: {
        menuText: string,
        href: string
    }[]
}
export class HomePage {

    /* Validate the "Shop Now" buttons on the Home page.
     * @param options
     * @param options.buttonsCount
     * @returns void
     * @example cy.validateShopNowButtons({ buttonsCount: 2 })
     * */
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

    /* Validate the top bar menu items on the Home page.
     * @param options
     * @param options.topBarMenuItems
     * @returns void    
     * @example cy.topBarMenuItemValidation({ topBarMenuItems: topBarMenuItems })
     * */
    topBarMenuItemValidation(data: data): void {
        cy.wrap(data.topBarMenuItems).each((menuItem: any, i) => {
            cy.log(`Validating menu item: ${menuItem.menuText}`);
            cy.get(`a[class^="jw-menu-link"][href="${menuItem.href}"]`).should('exist').scrollIntoView({ timeout: 10000 }).within(() => {
                cy.get('span').should('contain.text', menuItem.menuText);
            });
            // Click on the menu item to navigate to the corresponding page.
            cy.get(`a[class^="jw-menu-link"][href="${menuItem.href}"]`).click({ force: true });
            // Validate page URL.
            cy.url().should('include', menuItem.href, { timeout: 10000 });
            cy.waitForPageToLoad();
            cy.get(`a[class*="js-active-menu-item"][href="${menuItem.href}"]`).should('exist');
        });
        // Validate the 'About Us' button navigation.
        cy.get('a[title="About Us"][href="/contact"]').should('exist').should('contain.text', 'About Us').scrollIntoView({ timeout: 10000 }).click({ force: true });
        cy.waitForPageToLoad();
        cy.url().should('include', '/contact', { timeout: 10000 });
    }
}
