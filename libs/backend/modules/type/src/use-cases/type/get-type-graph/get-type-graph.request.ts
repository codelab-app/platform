import { WithTransactionRequest } from '@codelab/backend/abstract/core'
import { GetTypeGraphInput } from './get-type-graph.input'

export interface GetTypeGraphRequest extends WithTransactionRequest {
  input: GetTypeGraphInput
}
