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

      /** sets the session cookie and then intercepts the session to add the user role 
       * https://www.youtube.com/watch?v=SzhulGxprCw
      */
      cy.setCookie('next-auth.session-token', id_token)
      cy.intercept('api/auth/session', {status: 200, user: {role: "ADMIN"}}).as('next-auth')

    })

  })
})
