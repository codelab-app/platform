/* eslint-disable @nx/enforce-module-boundaries */
import { getEnv } from '@codelab/shared/config'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import { areDirectoriesIdentical } from 'libs/backend/shared/util/src/file/directory-compare'
import { encrypt } from 'libs/frontend/test/cypress/nextjs-auth0/src/utils/encrypt'
import { sessionFromToken } from 'libs/frontend/test/cypress/nextjs-auth0/src/utils/session'
import path from 'path'

export const testCypressJsonConfig: Cypress.ConfigOptions = {
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    auth0BaseUrl: getEnv().endpoint.platformHost,
    auth0ClientId: getEnv().auth0.clientId,
    auth0ClientSecret: getEnv().auth0.clientSecret,
    auth0CookieSecret: getEnv().auth0.secret,
    auth0IssuerBaseUrl: getEnv().auth0.issuerBaseUrl,
    auth0LogoutUrl: '/api/auth/logout',
    auth0Password: getEnv().auth0.cypressPassword,
    auth0ReturnToUrl: '/',
    auth0Scope: 'openid profile email',
    auth0SessionCookieName: 'appSession',
    // This is the Auth0 Management API url
    auth0Username: getEnv().auth0.cypressUsername,
    platformApiHost: getEnv().endpoint.platformApiHost,
    workspaceRoot: path.resolve(__dirname, '../..'),
  },
  execTimeout: 5000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  pageLoadTimeout: 10000,
  projectId: '9hfoow',
  responseTimeout: 5000,
  retries: {
    openMode: 0,
    runMode: 1,
  },
  screenshotsFolder: './src/screenshots',
  // specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
  setupNodeEvents: (on, config) => {
    on('task', {
      areDirectoriesIdentical,
      encrypt,
      sessionFromToken,
    })
  },
  testIsolation: false,
  video: true,
  videosFolder: './src/videos',
  viewportHeight: 960,
  viewportWidth: 1280,
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...testCypressJsonConfig,
  },
})
