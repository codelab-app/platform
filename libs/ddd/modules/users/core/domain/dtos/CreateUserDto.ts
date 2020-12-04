import { UserEmail } from '../user-email'
import { UserPassword } from '../user-password'

export interface CreateUserDto {
  email: UserEmail
  password: UserPassword
}
