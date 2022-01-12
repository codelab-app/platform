import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { UpdateElementPropsInput } from './update-element-props.input'

export interface UpdateElementPropsRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: UpdateElementPropsInput
}
