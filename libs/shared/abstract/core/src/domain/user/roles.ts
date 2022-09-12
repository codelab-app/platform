import { Nullish } from '@codelab/shared/abstract/types'
import { Auth0SessionUser, JWT_CLAIMS } from './jwt.interface'
import { IRole } from './role.enum'
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
