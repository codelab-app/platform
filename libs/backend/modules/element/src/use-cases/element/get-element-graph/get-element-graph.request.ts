import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { GetElementGraphInput } from './get-element-graph.input'

export interface GetElementGraphRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: GetElementGraphInput
}
