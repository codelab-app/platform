import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { RemoveHookFromElementInput } from './remove-hook-from-element.input'

export interface RemoveHookFromElementRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: RemoveHookFromElementInput
}
