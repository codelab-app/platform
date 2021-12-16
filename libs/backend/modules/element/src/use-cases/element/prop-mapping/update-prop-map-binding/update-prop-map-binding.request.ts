import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdatePropMapBindingInput } from './update-prop-map-binding.input'

export interface UpdatePropMapBindingRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdatePropMapBindingInput
}
