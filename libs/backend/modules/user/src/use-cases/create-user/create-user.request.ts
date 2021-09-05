import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { CreateUserInput } from './create-user.input'

export interface CreateUserRequest extends WithCurrentUserRequest {
  input: CreateUserInput

  currentUser: User
}
