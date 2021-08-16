import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'

export class GetTagsRequest implements WithCurrentUserRequest {
  // declare input: GetTagsInput

  declare currentUser: User
}
