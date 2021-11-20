import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { UpsertAtomsInput } from './upsert-atoms.input'

export interface UpsertAtomsRequest extends WithCurrentUserRequest {
  input: UpsertAtomsInput
}
