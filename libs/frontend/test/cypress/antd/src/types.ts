export type Label = RegExp | number | string

export type CommonOptions = Partial<
  Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable
>
