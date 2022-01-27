import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { UpdatePrimitiveTypeInput } from './update-primitive-type.input'

export interface UpdatePrimitiveTypeRequest extends WithCurrentUserRequest {
  input: UpdatePrimitiveTypeInput
}
