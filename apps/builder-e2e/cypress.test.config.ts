import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import setupNodeEvents from './src/plugins/index'

const cypressJsonConfig: Cypress.ConfigOptions = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videosFolder: './src/videos',
  screenshotsFolder: './src/screenshots',
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  responseTimeout: 20000,
  execTimeout: 20000,
  pageLoadTimeout: 20000,
  experimentalSessionAndOrigin: false,
  // projectId: '37q6ed',
  env: {},
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportWidth: 1280,
  viewportHeight: 960,
  // specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    setupNodeEvents,
    env: {
      CYPRESS_ENABLE_LOGGING: false,
    },
  },
})
