export type Cypress<T> = Cypress.Chainable<T>

export type ElementTagName = keyof HTMLElementTagNameMap

export type CypressElementTag<T extends ElementTagName> = Cypress<
  JQuery<HTMLElementTagNameMap[T]>
>
export type CypressButton = Cypress<JQuery<HTMLButtonElement>>

export type CypressElement = Cypress<JQuery>

export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never
