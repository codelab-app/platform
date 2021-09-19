import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { UpdateFieldInput } from './update-field.input'

export interface UpdateFieldRequest extends WithCurrentUserRequest {
  input: UpdateFieldInput
}
