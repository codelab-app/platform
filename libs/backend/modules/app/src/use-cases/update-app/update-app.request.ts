import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { UpdateAppInput } from './update-app.input'

export interface UpdateAppRequest extends WithCurrentUserRequest {
  input: UpdateAppInput
}
