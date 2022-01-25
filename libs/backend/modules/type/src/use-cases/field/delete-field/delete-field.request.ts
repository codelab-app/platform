import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { DeleteFieldInput } from './delete-field.input'

export interface DeleteFieldRequest extends WithTransactionRequest {
  input: DeleteFieldInput
}
