import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { GetAtomInput } from './get-atom.input'

export interface GetAtomRequest extends WithTransactionRequest {
  input: GetAtomInput
}
