import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { ImportAppInput } from './import-app.input'

export interface ImportAppRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: ImportAppInput
}
