/* eslint-disable @nx/enforce-module-boundaries */
// import type { IApp } from '@codelab/shared/abstract/core'
import { getEnv } from '@codelab/shared/config'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import path from 'path'

/**
 * We seed an app here that is shared across many specs
 */
// export let cypressApp: IApp

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
  experimentalInteractiveRunEvents: true,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',

  pageLoadTimeout: 15000,
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('cypress-terminal-report/src/installLogsPrinter')(on)
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
    /**
     * This key is not documented in Cypress, but works to turn of logs
     *
     * https://github.com/cypress-io/cypress/issues/26284
     */
    ...({ morgan: false } as Cypress.ConfigOptions),
  },
})
