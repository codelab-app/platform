import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { GetElementGraphInput } from './get-element-graph.input'

export class GetElementGraphRequest implements WithCurrentUserRequest {
  declare input: GetElementGraphInput

  declare currentUser: IUser
}
