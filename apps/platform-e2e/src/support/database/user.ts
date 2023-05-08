import type { IAuth0Owner } from '@codelab/shared/abstract/core'

export const getCurrentOwner = () => {
  return cy.request('/api/auth/me').then<IAuth0Owner>((result) => {
    return { auth0Id: result.body.sub }
  })
}
