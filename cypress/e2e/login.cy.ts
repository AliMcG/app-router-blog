describe('Logging In', () => {
  it('should login with google', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
 
    // Find a link with an href attribute containing "blog" and click it
    cy.get('[data-cy="/blog"]').click()
 
    // The new url should include "/blog"
    cy.url().should('include', '/blog')

    // Select the first blog in the list
    cy.get('[data-cy="search-bar"]').type("beer")
    cy.get('[data-cy="search-submit"]').click()

    cy.get('[data-cy="searched-blog-title"]').should('contain', 'beer')
  })
})