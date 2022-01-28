import { Nullish } from '@codelab/shared/abstract/types'
import { Role } from './role.enum'
import { IUser } from './user.interface'

export const isAdmin = (user: Nullish<IUser>): user is IUser & boolean => {
  return !!user && user.roles.includes(Role.Admin)
}

export const isUser = (user: Nullish<IUser>): user is IUser & boolean => {
  return !!user && user.roles.includes(Role.User)
}
