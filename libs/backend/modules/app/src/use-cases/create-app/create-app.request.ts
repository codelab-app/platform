import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { CreateAppInput } from './create-app.input'

export class CreateAppRequest implements WithCurrentUserRequest {
  declare input: CreateAppInput

  declare currentUser: User
}
