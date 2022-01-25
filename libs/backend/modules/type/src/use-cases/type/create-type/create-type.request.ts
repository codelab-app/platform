import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { CreateTypeInput } from './inputs/create-type.input'

export interface CreateTypeRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: CreateTypeInput
}
