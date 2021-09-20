import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { ImportAtomsInput } from './import-atoms.input'

export interface ImportAtomsRequest extends WithCurrentUserRequest {
  input: ImportAtomsInput
}
