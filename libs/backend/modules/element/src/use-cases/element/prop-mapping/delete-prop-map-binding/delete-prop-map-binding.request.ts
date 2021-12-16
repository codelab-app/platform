import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { DeletePropMapBindingInput } from './delete-prop-map-binding.input'

export interface DeletePropMapBindingRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: DeletePropMapBindingInput
}
