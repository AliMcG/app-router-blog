/* eslint-disable @typescript-eslint/no-unsafe-assignment */
describe("Add a new blog and delete it", () => {
  before(() => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
    cy.loginByGoogleApi();
    cy.visit("http://localhost:3000/");
  });
  it("should a add a new blog", () => {
    cy.get('[data-cy="/add"]').click();
    cy.get('[data-cy="title-input"]').type("TESTING");
    // cy.get("#description").type("TESTING TESTING");
    // cy.get('[data-cy="description-input"]').type("TESTING TESTING")

    cy.fixture("example.png", null).as("example_image")
    cy.get('[data-cy="image-input"]').selectFile("@example_image");

  });
});
