import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { ExportAppInput } from './export-app.input'

export interface ExportAppRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: ExportAppInput
}
