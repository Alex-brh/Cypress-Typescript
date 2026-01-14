
describe('Test "Home" page by', () => {
    
    it('validating its URL and title', () => {
        cy.navigateToUrl('https://free-5288352.webadorsite.com/');
        cy.validateElementText('h1[id="jw-header-title"] > span', 'DEMO tEST store');
    })
})
