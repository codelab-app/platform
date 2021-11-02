import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateAtomsInput } from './create-atoms.input'

export interface CreateAtomsRequest extends WithCurrentUserRequest {
  input: CreateAtomsInput
}
