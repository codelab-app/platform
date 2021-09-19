import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { GetTypesInput } from './get-types.input'

export interface GetTypesRequest extends WithCurrentUserRequest {
  input: GetTypesInput
}
