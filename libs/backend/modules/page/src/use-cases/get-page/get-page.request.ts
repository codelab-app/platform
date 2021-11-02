import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { GetPageInput } from './get-page.input'

export class GetPageRequest implements WithCurrentUserRequest {
  declare input: GetPageInput

  declare currentUser: IUser
}
