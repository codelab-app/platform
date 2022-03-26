import snakeCase from 'lodash/snakeCase'
import Chainable = Cypress.Chainable

// region: Logging

export const MUTE = { log: false }

const mute = <O extends Partial<Cypress.Loggable>>(
  options?: O,
): O & { log: boolean } => Object.assign({}, options, MUTE)

const log = (name: string, message = '', { log: shouldLog = true } = {}) => {
  if (shouldLog) {
    cy.wrap({ name, displayName: snakeCase(name), message }, MUTE).then(
      Cypress.log,
    )
  }
}

export const logAndMute = <O extends Partial<Cypress.Loggable>>(
  name: string,
  message?: string,
  options?: O,
): O & { log: boolean } => {
  log(name, message, options)

  return mute(options)
}

// endregion
// region: Clock

export const getClock = (callback: (clock: Cypress.Clock) => void) =>
  cy.wrap([], MUTE).then(function () {
    callback(this.clock)
  })

export const ifOnClock = (callback: (clock: Cypress.Clock) => void) =>
  getClock((clock) => clock && callback(clock))

export type TickOptions = { tickInterval?: number }
export const tickIfOnClock = ({ tickInterval = 100 }: TickOptions = {}) =>
  getClock((clock) => {
    if (clock) {
      clock.tick(tickInterval)
    }
  })

// endregion
// region: Macros

export const triggerAliased =
  <K extends keyof DocumentEventMap>(
    commandName: string,
    eventName: string,
    defaultOptions = {},
  ) =>
  (
    options?: Partial<
      Cypress.TriggerOptions & Cypress.ObjectLike & DocumentEventMap[K]
    >,
  ) =>
  ($el: JQuery) => {
    const opts = logAndMute(commandName, '', options)
    cy.wrap($el, MUTE).trigger(eventName, { ...defaultOptions, ...opts })
  }

export const expectVisibleText =
  (selector: () => Chainable<JQuery>) => (expectedText: string) =>
    selector().should('be.visible').and('have.text', expectedText)

// endregion
