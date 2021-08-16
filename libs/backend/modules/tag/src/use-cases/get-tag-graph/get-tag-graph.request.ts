import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'

export class GetTagGraphRequest implements WithCurrentUserRequest {
  // declare input: GetTagGraphInput

  declare currentUser: User
}
