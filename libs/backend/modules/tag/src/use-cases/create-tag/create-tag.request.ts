import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { CreateTagInput } from './create-tag.input'

export class CreateTagRequest implements WithCurrentUserRequest {
  declare input: CreateTagInput

  declare currentUser: User
}
