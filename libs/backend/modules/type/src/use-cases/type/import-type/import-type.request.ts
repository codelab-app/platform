import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { ImportTypeServiceInput } from './import-type.input'

export interface ImportTypeRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: ImportTypeServiceInput
}
