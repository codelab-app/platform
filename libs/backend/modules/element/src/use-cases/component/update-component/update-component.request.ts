import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { UpdateComponentInput } from './update-component.input'

export class UpdateComponentRequest implements WithCurrentUserRequest {
  declare input: UpdateComponentInput

  declare currentUser: User
}
