import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'

export class SeedTagTreeRequest implements WithCurrentUserRequest {
  declare currentUser: IUser
}
