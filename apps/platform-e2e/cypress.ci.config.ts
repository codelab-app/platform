import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import setupNodeEvents from './src/plugins/index'

const cypressJsonConfig: Cypress.ConfigOptions = {
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  env: {},
  execTimeout: 20000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  pageLoadTimeout: 20000,
  // Cypress Cloud
  projectId: '9hfoow',
  responseTimeout: 20000,
  // numTestsKeptInMemory: 1,
  retries: {
    openMode: 0,
    runMode: 1,
  },
  screenshotsFolder: './src/screenshots',
  video: true,
  videosFolder: './src/videos',
  viewportHeight: 960,
  viewportWidth: 1280,
  // specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    env: {},
    setupNodeEvents,
  },
})
