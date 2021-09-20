import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ImportApiInput } from './import-api.input'

export interface ImportApiRequest extends WithCurrentUserRequest {
  input: ImportApiInput
}
