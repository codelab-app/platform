import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import { testCypressJsonConfig } from './cypress.test.config'

const ciCypressJsonConfig: Cypress.ConfigOptions = {
  ...testCypressJsonConfig,
  defaultCommandTimeout: 20000,
  execTimeout: 20000,
  pageLoadTimeout: 20000,
  // Cypress Cloud
  responseTimeout: 60000,
  // retries: {
  //   openMode: 0,
  //   runMode: 1,
  // },
}

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename),
    ...ciCypressJsonConfig,
  },
})
