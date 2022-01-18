import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ImportTypeserviceInput } from './import-type.input'

export interface ImportTypeRequest extends WithCurrentUserRequest {
  input: ImportTypeserviceInput
}
