import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { GetFieldInput } from './get-field.input'

export interface GetFieldRequest extends WithTransactionRequest {
  input: GetFieldInput
}
