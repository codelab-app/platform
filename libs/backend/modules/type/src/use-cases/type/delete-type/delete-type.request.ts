import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { DeleteTypeInput } from './delete-type.input'

export interface DeleteTypeRequest extends WithCurrentUserRequest {
  input: DeleteTypeInput
}
