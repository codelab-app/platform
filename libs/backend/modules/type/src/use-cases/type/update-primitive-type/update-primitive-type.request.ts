import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdatePrimitiveTypeInput } from './update-primitive-type.input'

export interface UpdatePrimitiveTypeRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdatePrimitiveTypeInput
}
