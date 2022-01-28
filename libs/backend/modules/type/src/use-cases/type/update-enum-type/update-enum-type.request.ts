import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { UpdateEnumTypeInput } from './update-enum-type.input'

export interface UpdateEnumTypeRequest extends WithCurrentUserRequest {
  input: UpdateEnumTypeInput
}
