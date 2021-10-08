import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateAppInput } from './create-app.input'

export interface CreateAppRequest extends WithCurrentUserRequest {
  input: CreateAppInput
}
