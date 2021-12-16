import { Role } from './role.enum'
import { IUser } from './user.interface'

export const isAdmin = (user?: IUser) => {
  return !!user && user.roles.includes(Role.Admin)
}

export const isUser = (user?: IUser) => {
  return !!user && user.roles.includes(Role.User)
}
