import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'

export class GetTagTreeRequest implements WithCurrentUserRequest {
  declare currentUser: User
}
