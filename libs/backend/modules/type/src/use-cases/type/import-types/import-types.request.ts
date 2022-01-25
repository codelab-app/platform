import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { ImportTypesInput } from './import-types.input'

export interface ImportTypesRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: ImportTypesInput
}
