import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'

export class GetTagsRequest implements WithCurrentUserRequest {
  // declare input: GetTagsInput

  declare currentUser: User
}
