/* eslint-disable @typescript-eslint/no-unsafe-assignment */
describe("Logging In", () => {
  before(() => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
    cy.loginByGoogleApi();
    cy.visit("http://localhost:3000/");
  });
  it("should login with google", () => {
    cy.get('[data-cy="/add"]').click();
    cy.get('[data-cy="title-input"]').type("TESTING")
    cy.get('#description').type("TESTING TESTING")
    cy.get('input[type="file"]').as('fileInput')

    cy.fixture('example.png').then(fileContent => {
      cy.get('@fileInput').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'example.png',
      mimeType: 'image/png'
      });
      });
  });
});
