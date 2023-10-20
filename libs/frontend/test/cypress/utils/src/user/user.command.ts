import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'

export const getCurrentUser = () => {
  return cy.request<Auth0IdToken>('/api/auth/me').then((response) => {
    const { email, nickname, sub, ...user } = response.body

    return {
      auth0Id: sub,
      email,
      id: user[JWT_CLAIMS].neo4j_user_id,
      roles: user[JWT_CLAIMS].roles.map((role) => IRole[role]),
      username: nickname,
    }
  })
}
