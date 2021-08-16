import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { GetElementGraphInput } from './get-element-graph.input'

export class GetElementGraphRequest implements WithCurrentUserRequest {
  declare input: GetElementGraphInput

  declare currentUser: User
}
