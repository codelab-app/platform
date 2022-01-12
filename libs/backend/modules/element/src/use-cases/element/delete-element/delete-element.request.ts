import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { DeleteElementInput } from './delete-element.input'

export interface DeleteElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: DeleteElementInput
}
