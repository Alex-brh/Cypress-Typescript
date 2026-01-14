
describe('Test "Home" page by', () => {
    
    it('validating its URL and title', () => {
        cy.visit('https://free-5288352.webadorsite.com/');
        cy.url().should('include', 'free-5288352.webadorsite.com', { timeout: 10000 });
        cy.get('h1[id="jw-header-title"] > span').should('exist').scrollIntoView().should('have.text', 'DEMO tEST store');
    })
})
