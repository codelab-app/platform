import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import get from 'lodash/get'

export const getMobxStore = (cb: (store: IDomainStore) => void) => {
  cy.window().should('have.property', '__store__')
  cy.window().then((window) => {
    const store = get(window, '__store__')

    cb(store)
  })
}
