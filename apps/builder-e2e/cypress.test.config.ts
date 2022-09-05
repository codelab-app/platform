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
  // ignoreTestFiles: ['*.ignore.ts', '*.required.ts'],
  defaultCommandTimeout: 10000,
  responseTimeout: 10000,
  execTimeout: 10000,
  pageLoadTimeout: 10000,
  experimentalSessionAndOrigin: false,
  projectId: '37q6ed',
  env: {},
  // testFiles: '**/*.spec.*',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportHeight: 1000,
  // specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    setupNodeEvents,
  },
})
