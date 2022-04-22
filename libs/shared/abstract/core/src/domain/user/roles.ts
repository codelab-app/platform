import { Nullish } from '@codelab/shared/abstract/types'
import { IRole } from './role.enum'
import { IUser } from './user.interface'

export const isAdmin = (user: Nullish<IUser>): user is IUser & boolean => {
  return !!user && user.roles.includes(IRole.Admin)
}

export const isUser = (user: Nullish<IUser>): user is IUser & boolean => {
  return !!user && user.roles.includes(IRole.User)
}
