import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdateTypeInput } from './update-type.input'

export interface UpdateTypeRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdateTypeInput
}
