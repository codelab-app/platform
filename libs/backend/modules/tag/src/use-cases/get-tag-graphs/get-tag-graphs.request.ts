import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { GetTagGraphsInput } from './get-tag-graphs.input'

export interface GetTagGraphsRequest extends WithCurrentUserRequest {
  input?: GetTagGraphsInput

  currentUser: IUser
}
