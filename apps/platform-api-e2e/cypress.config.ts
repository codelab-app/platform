import { getEnv } from '@codelab/shared/config'
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
// Cannot import barrel, since Cypress not defined yet
// eslint-disable-next-line @nx/enforce-module-boundaries
import { encrypt } from 'libs/testing/cypress/nextjs-auth0/src/utils/encrypt'

const cypressJsonConfig: Cypress.ConfigOptions = {
  env: {
    auth0Audience: getEnv().auth0.audience,
    auth0ClientId: getEnv().auth0.clientId,
    auth0ClientSecret: getEnv().auth0.clientSecret,
    auth0CookieSecret: getEnv().auth0.secret,
    auth0Domain: getEnv().auth0.issuerBaseUrl,
    auth0LogoutUrl: '/api/auth/logout',
    auth0Password: getEnv().auth0.cypressPassword,
    auth0ReturnToUrl: '/',
    auth0Scope: 'openid profile email',
    auth0SessionCookieName: 'appSession',
    // This is the Auth0 Management API url
    auth0Username: getEnv().auth0.cypressUsername,
  },
  setupNodeEvents: (on, config) => {
    on('task', { encrypt })
  },
  testIsolation: false,
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
})
