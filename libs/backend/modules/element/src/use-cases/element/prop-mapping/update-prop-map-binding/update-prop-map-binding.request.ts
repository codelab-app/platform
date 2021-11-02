import type { IUser } from '@codelab/shared/abstract/core'
import { UpdatePropMapBindingInput } from './update-prop-map-binding.input'

export class UpdatePropMapBindingRequest {
  declare currentUser: IUser

  declare input: UpdatePropMapBindingInput
}
