import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { GetComponentsInput } from './get-components.input'

export interface GetComponentsRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input?: GetComponentsInput
}
