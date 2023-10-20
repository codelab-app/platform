/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CypressCommand {
  fn: any
  name: keyof Cypress.Chainable<any>
  options?: Cypress.CommandOptions
}
