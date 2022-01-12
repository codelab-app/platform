import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { CreatePropInput } from './create-prop.input'

export interface CreatePropRequest extends WithTransactionRequest {
  input: CreatePropInput
}
