import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'

export const getCurrentOwner = () => {
  return cy.request('/api/auth/me').then<IAuth0User>((result) => {
    return { auth0Id: result.body.sub }
  })
}
