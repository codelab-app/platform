// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never

export type CommonOptions = Partial<
  Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable
>

export type Label = RegExp | number | string
