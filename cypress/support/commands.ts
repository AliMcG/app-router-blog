/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginByGoogleApi(): Chainable<void>
    }
  }
}
/** Helper function to generate random hexadecimal number */
const genRanHex = (length: number) =>
  [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

// cypress/support/commands.js
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  /** Programmatically logs into Google with NextAuth
   * https://docs.cypress.io/guides/end-to-end-testing/google-authentication#Custom-Command-for-Google-Authentication
   */
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      const user = body;
      /** sets the session cookie and then intercepts the session to add the user role 
       * https://www.youtube.com/watch?v=SzhulGxprCw
      */
      cy.intercept("api/auth/session", (req) => {
        req.reply({
          status: 200,
          body: {
            ...user,
            role: "ADMIN"
          },
        });
      }).as("next-auth");
        /** Generates random values for session */
        const sessionCookie = genRanHex(24)
        const sessionId = genRanHex(24)
        /** Post a new session to the database to be authenticated by nextAuth in the browser. */
        cy.request({
          method: "POST",
          url: Cypress.env("databaseApiUrl"),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "api-key":
            Cypress.env("databaseApiKey"),
          },
          body: {
            dataSource:  Cypress.env("databaseSource"),
            database: Cypress.env("databaseName"),
            collection: Cypress.env("databaseCollection"),
            document: {
              _id: { $oid: sessionId },
              sessionToken: sessionCookie,
              userId: { $oid: Cypress.env("databaseUserId"), },
              expires: { $date: new Date(Date.now() + 1 * (60 * 60 * 1000) ) },
            },
          },
        }).then(() => {
          /** OnSuccessfully updating the databse with new session, sets the cookie with the new session. */
          cy.setCookie("next-auth.session-token", sessionCookie);
        })
      // cy.setCookie('next-auth.session-token', id_token)
      // cy.intercept('api/auth/session', {status: 200, user: {role: "ADMIN"}}).as('next-auth')
    })
  })
})
