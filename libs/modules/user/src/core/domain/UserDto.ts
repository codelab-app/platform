import { Optional } from 'utility-types'
import { User } from './User'

export type UserDto = Optional<User, 'apps'>
