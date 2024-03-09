describe('Navigation', () => {
  it('should navigate to the blog page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
 
    // Find a link with an href attribute containing "blog" and click it
    cy.get('[data-cy="/blog"]').click()
 
    // The new url should include "/blog"
    cy.url().should('include', '/blog')
  })

  it('should navigate to the contact page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/blog')
 
    // Find a link with an href attribute containing "contact" and click it
    cy.get('[data-cy="/contact"]').click()
 
    // The new url should include "/contact"
    cy.url().should('include', '/contact')
  })

  it('should navigate to the home page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/contact')
 
    // Find a link with an href attribute containing "home" and click it
    cy.get('[data-cy="/"]').click()
 
    // The new url should include "/home"
    cy.url().should('include', '/')
  })
})

describe('Read a blog entry', () => {
  it('should open and read a blog', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
 
    // Find a link with an href attribute containing "blog" and click it
    cy.get('[data-cy="/blog"]').click()
 
    // The new url should include "/blog"
    cy.url().should('include', '/blog')

    // Select the first blog in the list
    cy.get('[data-cy="blog-link-1"]').click()
  })
})

describe('Search for a blog entry', () => {
  it('should search for a blog', () => {
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