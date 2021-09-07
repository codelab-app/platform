import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { UpsertUserInput } from './upsert-user.input'

export interface UpsertUserRequest extends WithCurrentUserRequest {
  input: UpsertUserInput

  currentUser: User
}
