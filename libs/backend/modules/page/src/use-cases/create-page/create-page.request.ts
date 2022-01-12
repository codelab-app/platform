import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreatePageInput } from './create-page.input'

export interface CreatePageRequest extends WithCurrentUserRequest {
  input: CreatePageInput
}
