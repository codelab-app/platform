import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { CreatePropMapBindingInput } from './create-prop-map-binding.input'

export interface CreatePropMapBindingRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: CreatePropMapBindingInput
}
