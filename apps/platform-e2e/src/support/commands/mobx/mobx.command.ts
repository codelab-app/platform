import type { IRootStore } from '@codelab/frontend/abstract/application'
import get from 'lodash/get'

export const getMobxStore = (cb: (store: IRootStore) => void) => {
  cy.window().should('have.property', '__store__')
  cy.window().then((window) => {
    const store = get(window, '__store__')

    cb(store)
  })
}
