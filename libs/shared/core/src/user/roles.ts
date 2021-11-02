import { IUser, Role } from '@codelab/shared/abstract/core'

export const isAdmin = (user: IUser) => {
  return user.roles.includes(Role.Admin)
}

export const isUser = (user: IUser) => {
  return user.roles.includes(Role.User)
}
