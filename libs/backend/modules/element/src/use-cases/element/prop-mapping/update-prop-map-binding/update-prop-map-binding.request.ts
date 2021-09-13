import type { User } from '@codelab/shared/abstract/core'
import { UpdatePropMapBindingInput } from './update-prop-map-binding.input'

export class UpdatePropMapBindingRequest {
  declare currentUser: User

  declare input: UpdatePropMapBindingInput
}
