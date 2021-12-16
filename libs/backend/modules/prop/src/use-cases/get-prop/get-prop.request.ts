import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { GetPropInput } from './get-prop.input'

export interface GetPropRequest extends WithTransactionRequest {
  input: GetPropInput
}
