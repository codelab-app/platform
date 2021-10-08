import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'

export interface GetAppsRequest extends WithCurrentUserRequest {
  currentUser: IUser
}
