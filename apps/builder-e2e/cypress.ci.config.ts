import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import setupNodeEvents from './src/plugins/index'

const cypressJsonConfig: Cypress.ConfigOptions = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: false,
  videosFolder: './src/videos',
  screenshotsFolder: './src/screenshots',
  chromeWebSecurity: false,
  // ignoreTestFiles: ['*.ignore.ts', '*.required.ts'],
  defaultCommandTimeout: 30000,
  responseTimeout: 60000,
  execTimeout: 60000,
  pageLoadTimeout: 60000,
  experimentalSessionAndOrigin: false,
  projectId: '86p5h3',
  env: {},
  // testFiles: '**/*.spec.*',
  // numTestsKeptInMemory: 1,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportHeight: 1000,
  // specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  // supportFile: 'src/support/e2e.ts',
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
    setupNodeEvents,
  },
})
