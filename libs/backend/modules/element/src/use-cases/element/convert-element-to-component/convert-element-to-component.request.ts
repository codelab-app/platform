import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'
import { ConvertElementToComponentInput } from './convert-element-to-component.input'

export interface ConvertElementToComponentRequest
  extends WithCurrentUserRequest,
    WithTransactionRequest {
  input: ConvertElementToComponentInput
}
