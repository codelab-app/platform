import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import setupNodeEvents from './src/plugins/index'

const cypressJsonConfig: Cypress.ConfigOptions = {
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  env: {},
  execTimeout: 30000,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  pageLoadTimeout: 30000,
  projectId: '9hfoow',
  responseTimeout: 40000,
  retries: {
    openMode: 0,
    runMode: 0,
  },
  screenshotsFolder: './src/screenshots',
  video: true,
  videosFolder: './src/videos',
  viewportHeight: 960,
  viewportWidth: 1280,
  // specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
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
