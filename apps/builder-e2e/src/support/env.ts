interface Env {
  e2e: {
    enableLogging?: boolean
  }
}

export const Env = (): Env => ({
  e2e: {
    enableLogging: Cypress.env('CYPRESS_ENABLE_LOGGING'),
  },
})
