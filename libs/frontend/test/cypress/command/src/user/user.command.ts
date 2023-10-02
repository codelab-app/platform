import { Role } from '@codelab/shared/abstract/codegen'
import type { IUserDTO } from '@codelab/shared/abstract/core'

export const getCurrentUser = () => {
  return cy.request('/api/auth/me').then<IUserDTO>((response) => {
    const { email, nickname, sub } = response.body

    return {
      auth0Id: sub,
      email,
      roles: [Role.Admin],
      username: nickname,
    }
  })
}
