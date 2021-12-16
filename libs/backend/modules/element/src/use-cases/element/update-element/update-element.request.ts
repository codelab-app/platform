import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdateElementInput } from './update-element.input'

export interface UpdateElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdateElementInput
}
