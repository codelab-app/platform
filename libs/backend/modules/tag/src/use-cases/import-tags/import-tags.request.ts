import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { ImportTagsInput } from './import-tags.input'

export interface ImportTagsRequest extends WithCurrentUserRequest {
  input: ImportTagsInput

  currentUser: IUser
}
