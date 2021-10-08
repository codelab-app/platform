import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { CreateComponentInput } from './create-component.input'

export class CreateComponentRequest implements WithCurrentUserRequest {
  declare input: CreateComponentInput

  declare currentUser: IUser
}
