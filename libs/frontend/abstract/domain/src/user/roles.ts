import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'

import type { IUserModel } from './user.model.interface'

export const isAdmin = (
  user: Nullish<IUserModel>,
): user is IUserModel & boolean => {
  return Boolean(user && user.roles.includes(IRole.Admin))
}

export const isAdminSession = (session: Auth0IdToken) => {
  return session[JWT_CLAIMS].roles.includes(IRole.Admin)
}

export const isUser = (
  user: Nullish<IUserModel>,
): user is IUserModel & boolean => {
  return Boolean(user && user.roles.includes(IRole.User))
}
