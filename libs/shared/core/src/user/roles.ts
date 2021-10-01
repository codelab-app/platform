import { Role, User } from '@codelab/shared/abstract/core'

export const isAdmin = (user: User) => {
  return user.roles.includes(Role.Admin)
}

export const isUser = (user: User) => {
  return user.roles.includes(Role.User)
}
