import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { UpsertTagInput } from './upsert-tag.input'

export interface UpsertTagRequest extends WithCurrentUserRequest {
  input: UpsertTagInput

  currentUser: IUser
}
