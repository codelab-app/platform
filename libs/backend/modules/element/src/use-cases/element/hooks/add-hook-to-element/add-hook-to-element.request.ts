import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { AddHookToElementInput } from './add-hook-to-element.input'

export interface AddHookToElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: AddHookToElementInput
}
