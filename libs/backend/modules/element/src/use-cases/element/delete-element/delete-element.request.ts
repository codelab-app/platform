import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { DeleteElementInput } from './delete-element.input'

export class DeleteElementRequest implements WithCurrentUserRequest {
  declare input: DeleteElementInput

  declare currentUser: IUser
}
