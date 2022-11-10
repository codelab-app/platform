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
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  execTimeout: 30000,
  pageLoadTimeout: 30000,
  experimentalSessionAndOrigin: false,
  // Old Cypress.io project ID but too expensive
  // projectId: '86p5h3',
  // New currents.dev alternative
  projectId: 'PsL4yR',
  env: {},
  // numTestsKeptInMemory: 1,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportWidth: 1280,
  viewportHeight: 960,
  // specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    setupNodeEvents,
    // specPattern: '**/e2e/**/component.cy.{js,jsx,ts,tsx}',
  },
})
