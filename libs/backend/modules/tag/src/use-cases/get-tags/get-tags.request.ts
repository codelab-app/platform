import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { GetTagsInput } from './get-tags.input'

export interface GetTagsRequest extends WithCurrentUserRequest {
  input?: GetTagsInput
}
