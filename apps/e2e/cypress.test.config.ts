import { getEnv } from '@codelab/shared/config'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter'
import path from 'path'

export const testCypressJsonConfig: Cypress.EndToEndConfigOptions = {
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  env: {
    apiHost: getEnv().endpoint.apiHost,
    auth0BaseUrl: getEnv().endpoint.webHost,
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
    workspaceRoot: path.resolve(__dirname, '../..'),
  },
  execTimeout: 5000,
  experimentalInteractiveRunEvents: true,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  pageLoadTimeout: 15000,
  projectId: '9hfoow',
  // reporter: 'cypress-mochawesome-reporter',
  responseTimeout: 5000,
  retries: {
    openMode: 0,
    runMode: 1,
  },
  screenshotsFolder: './src/screenshots',
  // supportFile: 'src/support/e2e.ts',
  setupNodeEvents: (on, config) => {
    // installLogsPrinter(on, {
    //   printLogsToConsole: 'always',
    // })
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // require('cypress-mochawesome-reporter/plugin')(on)
  },
  specPattern: './src/e2e/**/state-sharing.cy.{js,jsx,ts,tsx}',
  testIsolation: false,
  video: true,
  videosFolder: './src/videos',
  viewportHeight: 960,
  viewportWidth: 1600,
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...testCypressJsonConfig,
    /**
     * This key is not documented in Cypress, but works to turn off logs
     *
     * https://github.com/cypress-io/cypress/issues/26284
     */
    ...({ morgan: false } as Cypress.ConfigOptions),
  },
})
