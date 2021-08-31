import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { UpdatePageInput } from './update-page.input'

export class UpdatePageRequest implements WithCurrentUserRequest {
  declare input: UpdatePageInput

  declare currentUser: User
}
