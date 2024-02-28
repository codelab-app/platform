/* eslint-disable @nx/enforce-module-boundaries */
// import type { IApp } from '@codelab/shared/abstract/core'
import { Auth0Client } from '@codelab/backend/infra/adapter/auth0'
import { createCypressRestClient } from '@codelab/backend/infra/adapter/rest-client'
import { postApiRequest } from '@codelab/frontend/test/cypress/utils'
import { getEnv } from '@codelab/shared/config'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import axios from 'axios'
import cypress, { defineConfig } from 'cypress'
import fs from 'fs'
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
    /* code that needs to run before all specs */
    // on('before:run', async (details: any) => {
    //   const cypressConfig = details.config as Required<Cypress.ConfigOptions>
    //   const clientId = cypressConfig.env.auth0ClientId
    //   const clientSecret = cypressConfig.env.auth0ClientSecret
    //   const issuerBaseUrl = cypressConfig.env.auth0IssuerBaseUrl
    //   const cypressUsername = cypressConfig.env.auth0Username
    //   const cypressPassword = cypressConfig.env.auth0Password
    //   const baseUrl = (cypressConfig as any).baseUrl

    //   const auth0Client = new Auth0Client({
    //     clientId,
    //     clientSecret,
    //     issuerBaseUrl,
    //   })

    //   const response = await auth0Client.loginWithPassword(
    //     cypressUsername,
    //     cypressPassword,
    //   )

    //   const accessToken = response.data.access_token
    //   const idToken = response.data.id_token!
    //   const restClient = createCypressRestClient(baseUrl, accessToken, idToken)

    //   try {
    //     // await restClient.post('/admin/reset-e2e-system-data')
    //     await restClient.post('/user/save')
    //   } catch (error) {
    //     console.log(error)
    //   }
    // })

    /**
     * This is the official Cypress way to remove videos from successful specs
     *
     * https://docs.cypress.io/guides/guides/screenshots-and-videos#Delete-videos-for-specs-without-failing-or-retried-tests
     */
    on(
      'after:spec',
      (spec: Cypress.Spec, results?: CypressCommandLine.RunResult) => {
        if (results?.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed'),
          )

          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video)
          }
        }
      },
    )
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
