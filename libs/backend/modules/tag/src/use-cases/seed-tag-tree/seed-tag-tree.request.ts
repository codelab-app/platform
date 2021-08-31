import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'

export class SeedTagTreeRequest implements WithCurrentUserRequest {
  declare currentUser: User
}
