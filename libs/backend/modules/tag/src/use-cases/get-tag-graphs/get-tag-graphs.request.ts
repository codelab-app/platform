import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { GetTagGraphsInput } from './get-tag-graphs.input'

export interface GetTagGraphsRequest extends WithCurrentUserRequest {
  input?: GetTagGraphsInput

  currentUser: User
}
