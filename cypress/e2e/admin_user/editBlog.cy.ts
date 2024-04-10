/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// describe("Edit a blog", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/");
//     cy.loginByGoogleApi();
//     cy.visit("http://localhost:3000/");
//   });
//   afterEach(() => {
//     cy.logout()
//   })

  it("should edit a blog", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="/blog"]').click()
    // cy.get("h2").click()
    cy.url().should('include', '/blog')
  });
// });
