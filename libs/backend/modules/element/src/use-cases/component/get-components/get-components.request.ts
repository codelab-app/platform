import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { GetComponentsInput } from './get-components.input'

export interface GetComponentsRequest extends WithCurrentUserRequest {
  input?: GetComponentsInput
}
