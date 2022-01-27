import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateFieldInput } from './create-field.input'

export interface CreateFieldRequest extends WithCurrentUserRequest {
  input: CreateFieldInput
}
