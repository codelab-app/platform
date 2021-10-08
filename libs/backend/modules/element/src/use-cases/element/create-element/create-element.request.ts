import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateElementInput } from './create-element.input'

export interface CreateElementRequest extends WithCurrentUserRequest {
  input: CreateElementInput
}
