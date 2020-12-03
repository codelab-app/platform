import { UserEmail } from '../../../domain/user-email'
import { UserPassword } from '../../../domain/user-password'

export interface CreateUserRequest {
  email: UserEmail
  password: UserPassword
}
