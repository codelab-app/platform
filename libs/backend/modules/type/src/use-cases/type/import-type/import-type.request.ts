import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ImportTypeServiceInput } from './import-type.input'

export interface ImportTypeRequest extends WithCurrentUserRequest {
  input: ImportTypeServiceInput
}
