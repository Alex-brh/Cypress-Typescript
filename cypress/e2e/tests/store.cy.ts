import * as data from '../../fixtures/store-data.json'
import { StorePage } from '../POM/store-page';
const storePage = new StorePage();

describe('Testing the "Store" page by validating the', () => {

    beforeEach(() => {
        cy.visit('/store');
        cy.url().should('include', '/store', { timeout: 30000 });
        cy.waitForPageToLoad();
    });

    it('top disclaimer and the "Type here" button', () => {
        // Validate the top disclaimer and the "Type here" button.
        const validationText = [
            "It's being used for educational purposes ONLY. Nothing can be purchased and/or delivered through this website",
            "DISCLAIMER: This is NOT a real e-comm",
            "Type here"
        ]
        storePage.validateTopDisclaimerAndTypeHereButton({ text: validationText });
    });

    it('presence of all product items on the Store page', () => {
        // Validate the presence of all product items on the Store page.
        storePage.validateStorePageProducts({ data: data });
    });

    it('product details page', () => {
        const products = [{
            name: 'Best test script A',
            price: 'CA$0.99',
            description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
            availability: 'Unavailable',
            addToCartText: 'Disabled',
            addToWishListButton: 'disabled',
            additionalOptions: [
                { locator: 'option[value="Option A"]', text: 'Option A (+ CA$0.50)' },
                { locator: 'option[value="Option B"]', text: 'Option B (+ CA$0.70)' },
                { locator: 'option[value="Option C"]', text: 'Option C (+ CA$0.90)' }
            ]
        },
        {
            name: 'Best test script B',
            price: 'CA$0.89',
            description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
            availability: 'Unavailable',
            addToCartText: 'Disabled',
            addToWishListButton: 'disabled',
            additionalOptions: []
        },
        {
            name: 'Best test script C',
            price: 'CA$0.79',
            description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
            availability: 'Unavailable',
            addToCartText: 'Disabled',
            addToWishListButton: 'disabled',
            additionalOptions: []
        }
        ];
        storePage.validateProductDetails({ data: { productDetails: products } });

    });

});