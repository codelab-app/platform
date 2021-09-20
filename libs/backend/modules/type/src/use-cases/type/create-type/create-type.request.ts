import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateTypeInput } from './create-type.input'

export interface CreateTypeRequest extends WithCurrentUserRequest {
  input: CreateTypeInput
}
