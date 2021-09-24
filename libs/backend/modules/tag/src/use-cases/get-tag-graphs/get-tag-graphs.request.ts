import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'

export interface GetTagGraphsRequest extends WithCurrentUserRequest {
  // input: GetTagGraphsInput

  currentUser: User
}
