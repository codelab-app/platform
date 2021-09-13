import type { User } from '@codelab/shared/abstract/core'
import { CreatePropMapBindingInput } from './create-prop-map-binding.input'

export class CreatePropMapBindingRequest {
  declare currentUser: User

  declare input: CreatePropMapBindingInput
}
