import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ImportAppInput } from './import-app.input'

export interface ImportAppRequest extends WithCurrentUserRequest {
  input: ImportAppInput
}
