import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { GetElementInput } from './get-element.input'

export interface GetElementRequest
  extends WithTransactionRequest,
    WithCurrentUserRequest {
  input: GetElementInput
}
