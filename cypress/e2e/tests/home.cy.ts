// One way to import data from fixture files.
import * as data from '../../fixtures/home-data.json'

describe('Test "Home" page by', () => {
    // Another way to import data from fixture files.
    const homeData = require('../../fixtures/home-data.json');

    beforeEach(() => {
        cy.navigateToUrl('https://free-5288352.webadorsite.com/');
    });

    it('validating its URL and title', () => {
        cy.validateElementText({ selector: 'h1[id="jw-header-title"] > span', expectedText: data.pageTitle });
    })

    it('validating main headers contents', () => {
        cy.wrap(data.header1).each((item: any, i) => {
            cy.log(`Validating: ${item.headerText}`);
            cy.validateElementText({ selector: 'h1[class^="jw-heading"]', index: i, expectedText: item.headerText });
        });
        cy.validateElementText({ selector: 'div[class="jw-slideshow-title"]', expectedText: "Discover Unique Ways To Create Test Scripts" });
    })

    it('validating paragraph contents', () => {
        cy.wrap(data.paragraphs).each((item: any, i) => {
            cy.log(`Validating: ${item.paragraphText}`);
            cy.validateElementText({ selector: 'div > p', index: i, expectedText: item.paragraphText });
        });
        cy.validateElementText({ selector: 'h3', expectedText: `“Online Store offers an incredible variety of unique items that I can't find anywhere else!”` });
    });

    it('validating top bar menu items and navigation to corresponding pages', () => {
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
        cy.wrap(topBarMenuItems).each((menuItem: any, i) => {
            cy.log(`Validating menu item: ${menuItem.menuText}`);
            cy.get(`a[class^="jw-menu-link"][href="${menuItem.href}"]`).should('exist').scrollIntoView({ timeout: 10000 }).within(() => {
                cy.get('span').should('contain.text', menuItem.menuText);
            });
            // Click on the menu item to navigate to the corresponding page.
            cy.get(`a[class^="jw-menu-link"][href="${menuItem.href}"]`).click({ force: true });
            cy.waitForPageToLoad();
            cy.get(`a[class*="js-active-menu-item"][href="${menuItem.href}"]`).should('exist');
            cy.url().should('include', menuItem.href, { timeout: 10000 });
        });
        // Validate the 'About Us' button navigation.
        cy.get('a[title="About Us"][href="/contact"]').should('exist').should('contain.text', 'About Us').scrollIntoView({ timeout: 10000 }).click({ force: true });
        cy.waitForPageToLoad();
        cy.url().should('include', '/contact', { timeout: 10000 });
    });

    it('validating page images', () => {
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

});