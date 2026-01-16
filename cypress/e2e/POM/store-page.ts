// Define an interface for the expected structure of a single product
interface Product {
    title: string;
    price: string;
    description: string;
    availability: string;
    addToCartText: string;
    isThereSeeDetailsButton: boolean;
}

// Define the interface for the options object
interface ValidateOptions {
    data: {
        products: Product[]; // The 'products' is an array of Product
    };
}

export class StorePage {

    validateStorePageProducts(options: ValidateOptions): void {
        let indexForSeeDetailsButtons = 0;
        options.data.products.forEach((product, i) => {
            //let product = data.products[0];
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

}