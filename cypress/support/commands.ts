/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="cypress" />


// cypress/support/commands.js
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
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
      // cy.log(body.email)
      // console.log("logging", body)
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }
      // window.localStorage.setItem('authToken', body.access_token)
    })

    // https://github.com/yeungalan0/site-monorepo/blob/main/my_site/cypress/support/commands.ts
    // Interesting example here to set the useSession

    // cy.session(userItem, () => {
    //   cy.request({
    //     method: 'GET',
    //     url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    //     headers: { Authorization: `Bearer ${access_token}` },
    //   }).then(({ body }) => {
    //     cy.log(body.email)
    //     console.log("logging", body)
    //     const userItem = {
    //       token: id_token,
    //       user: {
    //         googleId: body.sub,
    //         email: body.email,
    //         givenName: body.given_name,
    //         familyName: body.family_name,
    //         imageUrl: body.picture,
    //       },
    //     }})
    // })
  })
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginByGoogleApi(): Chainable<void>
      LoginWithGoogle(): Chainable<void>
    }
  }
}