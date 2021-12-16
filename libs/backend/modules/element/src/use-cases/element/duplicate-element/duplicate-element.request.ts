import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { DuplicateElementInput } from './duplicate-element.input'

export interface DuplicateElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: DuplicateElementInput
}
