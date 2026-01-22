// One way to import data from fixture files.
import * as data from '../../fixtures/home-data.json'
import { HomePage } from '../POM/home-page';
const homePage = new HomePage();

describe('Test "Home" page by validating', () => {
    // Another way to import data from fixture files.
    const homeData = require('../../fixtures/home-data.json');

    beforeEach(() => {
        cy.launchTheStore();
        cy.waitForPageToLoad();
    });

    it('URL and title', () => {
        cy.validateElementText({ selector: 'h1[id="jw-header-title"] > span', expectedText: data.pageTitle });
    })

    it('main headers contents', () => {
        cy.wrap(data.header1).each((item: any, i) => {
            cy.log(`Validating: ${item.headerText}`);
            cy.validateElementText({ selector: 'h1[class^="jw-heading"]', index: i, expectedText: item.headerText });
        });
        cy.validateElementText({ selector: 'div[class="jw-slideshow-title"]', expectedText: "Discover Unique Ways To Create Test Scripts" });
    })

    it('paragraph contents', () => {
        cy.wrap(data.paragraphs).each((item: any, i) => {
            cy.validateElementText({ selector: 'div > p', index: i, expectedText: item.paragraphText });
        });
        cy.validateElementText({ selector: 'h3', expectedText: `“Online Store offers an incredible variety of unique items that I can't find anywhere else!”` });
    });

    it('top bar menu items and navigation to corresponding pages', () => {
        const topBarMenuItems = [
            { menuText: 'Home', href: '/' },
            { menuText: 'Store', href: "/store" },
            { menuText: 'FAQ', href: "/faq" },
            { menuText: 'Customer Testimonials', href: "/customer-testimonials" },
            { menuText: 'Contact', href: "/contact" },
            { menuText: 'Elements with frames', href: "/elements-with-frames" },
            { menuText: 'Showcase', href: "/showcase" },
            { menuText: 'Clearance', href: "/clearance" }
        ]
        // Validate the top bar menu items on the Home page.
        homePage.topBarMenuItemValidation({ topBarMenuItems: topBarMenuItems });
    });

    it('page images', () => {
        let pictureCount: number;
        cy.get('img').its('length').then((length: number) => {
            pictureCount = length;
            assert.equal(pictureCount, 5, 'Image count should be 5 on the Home page');
            cy.log(`Total images on the page: ${pictureCount}`);
            for (let i = 0; i < pictureCount; i++) {
                cy.validateElementAttribute({ selector: 'picture[class^="jw-element-image__image-wrapper"] > img', attribute: 'style' });
            }
        });

    });

    it('that the "Shop Now" buttons are present and functional', () => {
        homePage.validateShopNowButtons({ buttonsCount: 2 });
    });


});