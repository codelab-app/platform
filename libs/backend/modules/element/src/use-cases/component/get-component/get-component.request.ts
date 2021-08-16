import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { GetComponentInput } from './get-component.input'

export class GetComponentRequest implements WithCurrentUserRequest {
  declare input: GetComponentInput

  declare currentUser: User
}
