import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { UpdatePageInput } from './update-page.input'

export class UpdatePageRequest implements WithCurrentUserRequest {
  declare input: UpdatePageInput

  declare currentUser: IUser
}
