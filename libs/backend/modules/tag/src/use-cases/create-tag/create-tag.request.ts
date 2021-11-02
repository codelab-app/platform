import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateTagInput } from './create-tag.input'

export interface CreateTagRequest extends WithCurrentUserRequest {
  input: CreateTagInput
}
