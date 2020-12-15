import { FindUserBy, FindUserByEmail, FindUserByID } from './CommonTypes'

export const isEmail = (value: FindUserBy): value is FindUserByEmail => {
  return (value as FindUserByEmail).email !== undefined
}
export const isId = (value: FindUserBy): value is FindUserByID => {
  return (value as FindUserByID).id !== undefined
}
