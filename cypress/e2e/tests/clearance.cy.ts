import { any } from 'cypress/types/bluebird';
import * as data from '../../fixtures/clearance-data.json'
import { ClearancePage } from '../POM/clearance-page';
const clearancePage = new ClearancePage();

describe('Test "Clearance" page by validating', () => {

    beforeEach(() => {
        // Navigate to the "Clearance" page before each test.
        clearancePage.navigateToClearancePage();
    });

    it('h2 headers', () => {
        // Validate h2 headers.
        clearancePage.h2HeaderValidation(data);
    });

    it('paragraph texts', () => {
        // Validate paragraph texts.
        clearancePage.paragraphTextValidation(data);
    });

    it('buttons attributes', () => {
        // Validate buttons attributes.
        clearancePage.buttonsValidation();
    });

    it('the "Sort" dropdown options', () => {
        // Validate the "Sort" dropdown options.
        clearancePage.sortDropdownOptionsValidation(data);
    });

    it("validating the Best Products", () => {
        // Validate the details of 'Best product #1,2,3'.
        const bestProductDetails = [
            {
                productHeaderIndex: 0,
                productHeaderText: "Best product #1",
                productImageIndex: 0,
                buttonDisabledIndex: 3,
                productPriceIndex: 0,
                productCost: "CA$150.00",
                productDescriptionIndex: 0,
                productDescriptionText: "This is NOT a real product. It's item for testing. It can't be purchased or ordered.",
                buttonAddToWishListIndex: 3,
                seeDetailsButtonIndex: 0,
                clearanceLabelIndex: 0,
                productUrlRouting: "best-product-1"
            },
            {
                productHeaderIndex: 1,
                productHeaderText: "Best product #2",
                productImageIndex: 1,
                buttonDisabledIndex: 4,
                productPriceIndex: 1,
                productCost: "CA$1,050.00",
                productDescriptionIndex: 1,
                productDescriptionText: "This is NOT a real product. It's item for testing. It can't be purchased or ordered.",
                buttonAddToWishListIndex: 4,
                seeDetailsButtonIndex: 1,
                clearanceLabelIndex: 1,
                productUrlRouting: "best-product-2"
            },
            {
                productHeaderIndex: 2,
                productHeaderText: "Best product #3",
                productImageIndex: 2,
                buttonDisabledIndex: 5,
                productPriceIndex: 2,
                productCost: "CA$10,500.00",
                productDescriptionIndex: 2,
                productDescriptionText: "This is NOT a real product. It's item for testing. It can't be purchased or ordered.",
                buttonAddToWishListIndex: 5,
                seeDetailsButtonIndex: 2,
                clearanceLabelIndex: 2,
                productUrlRouting: "best-product-3"
            }
        ]
        for (const [i, expectedBestProductDetails] of bestProductDetails.entries()) {
            clearancePage.validateBestProductDetails(expectedBestProductDetails);

        }
    });

});
