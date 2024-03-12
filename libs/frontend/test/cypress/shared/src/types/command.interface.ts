/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CypressCommand {
  fn: any
  name: keyof Cypress.Chainable<any>
  options?: Cypress.CommandOptions
}

export type CommandOptions = Cypress.CommandOptions & {
  prevSubject: Cypress.PrevSubject
}
