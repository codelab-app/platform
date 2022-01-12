import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { UpdatePropInput } from './update-prop.input'

export interface UpdatePropRequest extends WithTransactionRequest {
  input: UpdatePropInput
}
