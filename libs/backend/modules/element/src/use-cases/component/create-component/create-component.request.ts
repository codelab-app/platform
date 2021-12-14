import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateComponentInput } from './create-component.input'

export interface CreateComponentRequest extends WithCurrentUserRequest {
  input: CreateComponentInput
}
