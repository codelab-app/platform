import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { IUser } from './user.interface'

export const isAdmin = (user: Nullish<IUser>): user is IUser & boolean => {
  return Boolean(user && user.roles.includes(IRole.Admin))
}

export const isAdminSession = (session: Auth0SessionUser) => {
  return session[JWT_CLAIMS].roles.includes(IRole.Admin)
}

export const isUser = (user: Nullish<IUser>): user is IUser & boolean => {
  return Boolean(user && user.roles.includes(IRole.User))
}
