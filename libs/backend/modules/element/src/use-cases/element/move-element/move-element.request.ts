import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { MoveElementInput } from './move-element.input'

export interface MoveElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: MoveElementInput
}
