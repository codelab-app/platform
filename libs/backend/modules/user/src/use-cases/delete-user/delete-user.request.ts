import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { DeleteUserInput } from './delete-user.input'

export interface DeleteUserRequest extends WithCurrentUserRequest {
  input: DeleteUserInput
}
