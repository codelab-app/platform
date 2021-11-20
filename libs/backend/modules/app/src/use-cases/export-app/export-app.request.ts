import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ExportAppInput } from './export-app.input'

export interface ExportAppRequest extends WithCurrentUserRequest {
  input: ExportAppInput
}
