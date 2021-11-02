import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { GetAppInput } from './get-app.input'

export interface GetAppRequest extends WithCurrentUserRequest {
  input: GetAppInput
}
