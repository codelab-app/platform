import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { User } from '@codelab/shared/abstract/core'
import { GetAppInput } from './get-app.input'

export class GetAppRequest implements WithCurrentUserRequest {
  declare input: GetAppInput

  declare currentUser: User
}
