import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdateUnionTypeInput } from './update-union-type.input'

export interface UpdateUnionRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdateUnionTypeInput
}
