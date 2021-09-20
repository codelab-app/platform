import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { GetTypeInput } from './get-type.input'

export interface GetTypeRequest extends WithCurrentUserRequest {
  input: GetTypeInput
}
