export type Label = string | number | RegExp

export type CommonOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Shadow
>
