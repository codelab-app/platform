import {
  Auth0SessionUser,
  IRole,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { IUser } from './user.interface'

export const isAdmin = (user: Nullish<IUser>): user is IUser & boolean => {
  return Boolean(user && user.roles.includes(IRole.Admin))
}

export const isAdminSession = (session: Auth0SessionUser) => {
  return session[JWT_CLAIMS]?.roles?.includes(IRole.Admin)
}

export const isUser = (user: Nullish<IUser>): user is IUser & boolean => {
  return Boolean(user && user.roles.includes(IRole.User))
}
