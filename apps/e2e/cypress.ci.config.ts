import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import { testCypressJsonConfig } from './cypress.test.config'

const ciCypressJsonConfig: Cypress.EndToEndConfigOptions = {
  ...testCypressJsonConfig,
  defaultCommandTimeout: 60000,
  execTimeout: 60000,
  pageLoadTimeout: 60000,
  // Cypress Cloud
  responseTimeout: 60000,
  retries: {
    // Increased the timeout from 20000 to 30000, then disable retry
    runMode: 0,
  },
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...ciCypressJsonConfig,
  },
})
