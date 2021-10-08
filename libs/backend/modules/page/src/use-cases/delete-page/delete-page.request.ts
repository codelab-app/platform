import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { DeletePageInput } from './delete-page.input'

export class DeletePageRequest implements WithCurrentUserRequest {
  declare input: DeletePageInput

  declare currentUser: IUser
}
