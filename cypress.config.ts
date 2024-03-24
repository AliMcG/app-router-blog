/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress";
import { plugins } from 'cypress-social-logins';
const googleSocialLogin = plugins.GoogleSocialLogin;
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        GoogleSocialLogin: googleSocialLogin,
      })
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false, // allow cypress to access cross-domain URLS such as NextAuth.js login provider pages
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
