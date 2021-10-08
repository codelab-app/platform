import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { MoveElementInput } from './move-element.input'

export class MoveElementRequest implements WithCurrentUserRequest {
  declare input: MoveElementInput

  declare currentUser: IUser
}
