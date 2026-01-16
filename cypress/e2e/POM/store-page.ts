// Define an interface for the expected structure of a single product
interface Product {
    title: string;
    price: string;
    description: string;
    availability: string;
    addToCartText: string;
    isThereSeeDetailsButton: boolean;
}

interface ProductDetails {
    name: string;
    price: string;
    description: string;
    availability: string;
    addToCartText: string;
    addToWishListButton: string;
    additionalOptions: { locator: string; text: string }[];
}

// Define the interface for the options object
interface ValidateOptions {
    data: {
        products: Product[]; // The 'products' is an array of Product
    };
}

interface ValidateProductDetailsOptions {
    data: {
        productDetails: ProductDetails[]; // The 'productDetails' is an array of ProductDetails
    };
}

export class StorePage {

    validateStorePageProducts(options: ValidateOptions): void {
        let indexForSeeDetailsButtons = 0;
        options.data.products.forEach((product, i) => {
            // Validate product title.
            cy.validateElementText({
                selector: `h3[class="product__heading heading__no-margin"] > a`,
                index: i,
                expectedText: product.title,
            });
            // Validate product pricing.
            cy.validateElementText({
                selector: `div[class="product__responsive-top"] div > div > span`,
                index: i,
                expectedText: product.price,
            });
            // Validate product description.
            cy.validateElementText({
                selector: `div[class="product__description"] > p > span`,
                index: i,
                expectedText: product.description,
            });
            // Validate product availability
            cy.validateElementText({
                selector: `div[class="product__responsive-top"] > div[class="product-sticker"]`,
                index: i,
                expectedText: product.availability,
            });
            // Validate 'Add to cart' button text.
            cy.validateElementText({
                selector: `button[class^="jw-btn product__add-to-cart"] > span[class="product__add-to-cart__label"]`,
                index: i,
                expectedText: product.addToCartText,
            });
            // Validate the 'Add to wish list' button is disabled.
            cy.validateElementAttribute({
                selector: `button[title="Add to wishlist"]`,
                index: i,
                attribute: 'disabled',
            })
            // Validate 'See details' button text if applicable.
            if (product.isThereSeeDetailsButton === true) {
                // Validate 'See details' button text.
                cy.validateElementText({
                    selector: `div[class="product__long-description"] > a[data-jwlink-type="product"]`,
                    index: indexForSeeDetailsButtons,
                    expectedText: "+ See details",
                });
                // Increment index for 'See details' buttons.
                indexForSeeDetailsButtons++;
            }

        });
    }

    validateProductDetails(options: ValidateProductDetailsOptions): void {
        cy.wrap(options.data.productDetails).each((productDetails: ProductDetails) => {
            // Open the product details page.
            cy.clickSmart({ selector: `h3[class="product__heading heading__no-margin"] > a[data-jwlink-title="${productDetails.name}"]` });
            cy.waitForPageToLoad();
            // Validate product Name.
            cy.validateElementText({
                selector: 'h1[class="product-page__heading"]',
                expectedText: productDetails.name
            });
            // Validate product pricing.
            cy.validateElementText({
                selector: 'div[class="product__price js-product-container__price"] > span[class="product__price__price"]',
                expectedText: productDetails.price
            });
            // Validate product description.
            cy.validateElementText({
                selector: 'div[class="product-page__description"] > p > span',
                expectedText: productDetails.description
            });
            // Validate product availability
            cy.validateElementText({
                selector: 'div[class="product-page__top"] > div[class="product-sticker"]',
                expectedText: productDetails.availability
            });
            // Validate 'Add to cart' button text.
            cy.validateElementText({
                selector: 'button > span[class="product__add-to-cart__label"]',
                expectedText: productDetails.addToCartText
            });
            // Validate 'Add to Wish List' button text.
            cy.validateElementAttribute({
                selector: 'button[aria-label="Add to wishlist"]',
                index: 0,
                attribute: 'disabled',
            });
            // If 'Additional options' are available - verify them.
            if (productDetails.additionalOptions.length > 0 || productDetails.additionalOptions != undefined) {
                productDetails.additionalOptions.forEach((option) => {
                    cy.log(`Validating additional option with locator: ${option.locator}, text: ${option.text}`);
                    cy.get('select[data-field-type="select"]').within(() => {
                        cy.get(option.locator).should('exist').and('contain.text', option.text);
                    });
                });
            }
            // If there are multiple products to validate, navigate back to the Store page after each validation.
            cy.log(`Number of products to validate: ${options.data.productDetails.length}`);
            if (options.data.productDetails.length > 1) {
                cy.clickSmart({ selector: 'a[href="/store"]' });
                cy.waitForPageToLoad();
            }
        });

    }

}