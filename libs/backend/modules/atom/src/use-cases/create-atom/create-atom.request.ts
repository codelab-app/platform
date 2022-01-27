import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { CreateAtomInput } from './create-atom.input'

export interface CreateAtomRequest extends WithCurrentUserRequest {
  input: CreateAtomInput
}
