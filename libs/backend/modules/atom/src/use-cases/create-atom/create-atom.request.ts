import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { CreateAtomInput } from './create-atom.input'

export interface CreateAtomRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: CreateAtomInput
}
