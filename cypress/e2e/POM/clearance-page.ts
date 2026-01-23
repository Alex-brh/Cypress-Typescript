interface ClearancePageData {
    h2Headers: { text: string }[];
    paragraphs: { text: string }[];
    sortDropdownOptions: { value: string }[];
}

interface BestProductDetails {
    productHeaderIndex?: number; // Optional.
    productImageIndex?: number; // Optional.
    buttonDisabledIndex?: number; // Optional.
    productPriceIndex?: number; // Optional.
    productDescriptionIndex?: number; // Optional.
    buttonAddToWishListIndex?: number; // Optional.
    seeDetailsButtonIndex?: number; // Optional.
    clearanceLabelIndex?: number; // Optional.
    productHeaderText?: string; // Optional.
    productCost?: string; // Optional.
    productDescriptionText?: string; // Optional.
    productUrlRouting?: string; // Optional.
    amountOfProductsDropdown?: number; // Optional.
    selectedAmountIndex?: number; // Optional.
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

    /**
     * Validate the sort dropdown options on the "Clearance" page.
     * @param data 
     * @returns void
     * @example cy.sortDropdownOptionsValidation(data)
     */
    sortDropdownOptionsValidation(data: ClearancePageData): void {
        // Validate default value.
        cy.validateElementAttribute({
            selector: 'select[id^="product-gallery-sort"] > option[value="manual"]',
            attribute: 'selected',
        });
        // Validate the "Sort" dropdown options after skipping the default value.
        data.sortDropdownOptions.slice(1).forEach((option) => {
            // Click the dropdown caret to expose all options.
            cy.clickSmart({ selector: 'div[class^="product-gallery-sorting"]' });
            cy.get(`select`)
                .select(option.value);
            // Verify data loading indicator appears and disappears.
            cy.get('div[class="jw-element-loader"] > span[class="jw-spinner"]', { timeout: 10000 })
                .should('be.visible');
            cy.get('div[class^="jw-data-loading-indicator"]', { timeout: 50000 })
                .should('not.exist');
            // Validate the selected option.
            cy.get('select[id^="product-gallery-sort"]')
                .find('option:selected')
                .should('have.value', option.value);
        });
    }

    /**
     * Validate the details of the Best Products on the "Clearance" page.
     * @param bestProductDetails
     */
    validateBestProductDetails(bestProductDetails: BestProductDetails): void {
        const {
            productHeaderIndex,
            productImageIndex,
            buttonDisabledIndex,
            productPriceIndex,
            productDescriptionIndex,
            buttonAddToWishListIndex,
            seeDetailsButtonIndex,
            clearanceLabelIndex,
            productHeaderText,
            productCost,
            productDescriptionText,
            productUrlRouting,
            selectedAmountIndex
        } = bestProductDetails;
        if (productHeaderIndex !== undefined && productHeaderText !== undefined) {
            // Validate product header text.
            cy.validateElementText({
                selector: 'h3[class^="product__heading"] > a',
                index: productHeaderIndex,
                expectedText: productHeaderText,
            });

        }
        if (productImageIndex !== undefined) {
            // Validate that the product image is visible.
            cy.validateElementAttribute({
                selector: 'a[data-segment-type="product"] > img',
                index: productImageIndex,
                attribute: 'src',
            })

        }
        if (buttonDisabledIndex !== undefined) {
            // Validate that the 'Disabled' button is visible.
            cy.validateElementText({
                selector: 'button[title="Disabled"][disabled]',
                index: buttonDisabledIndex,
                expectedText: 'Disabled',
            });
        }
        if (productPriceIndex !== undefined && productCost !== undefined) {
            // Validate product price text.
            cy.validateElementText({
                selector: 'div[class="product__price js-product-container__price"] > span',
                index: productPriceIndex,
                expectedText: productCost,
            });
        }
        if (productDescriptionIndex !== undefined && productDescriptionText !== undefined) {
            // Validate product description text.
            cy.validateElementText({
                selector: 'div[class="product__description"] > p',
                index: productDescriptionIndex,
                expectedText: productDescriptionText,
            });
        }
        if (buttonAddToWishListIndex !== undefined) {
            // Validate that the 'Add to wish list' button is visible.
            cy.validateElementAttribute({
                selector: 'button[aria-label="Add to wishlist"]',
                index: buttonAddToWishListIndex,
                attribute: 'title',
                expectedValue: 'Add to wishlist'
            });
        }
        if (clearanceLabelIndex !== undefined) {
            // Validate that the 'Clearance' label is visible.
            cy.validateElementText({
                selector: 'div[class="product__top"] > div[class="product-sticker"]',
                index: clearanceLabelIndex,
                expectedText: 'Clearance'
            });

        }
        if (seeDetailsButtonIndex !== undefined) {
            // Validate that the 'See details' button is visible.
            cy.validateElementText({
                selector: 'div[class="product__long-description"] > a',
                index: seeDetailsButtonIndex,
                expectedText: 'See details'
            });
            // Click the 'See details' button and validate navigation to the product details page.
            cy.clickSmart({ selector: 'div[class="product__long-description"] > a', index: seeDetailsButtonIndex });
            cy.url().should('include', productUrlRouting as string);
            cy.waitForPageToLoad();
            // Click the 'Clearance' menu item to navigate to the contact page.
            cy.clickSmart({ selector: 'a[href="/clearance"]', index: 0 });
            cy.waitForPageToLoad();
            cy.url().should('include', '/clearance');
        }
    }
}