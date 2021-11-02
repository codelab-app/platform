import type { IUser } from '@codelab/shared/abstract/core'
import { CreatePropMapBindingInput } from './create-prop-map-binding.input'

export class CreatePropMapBindingRequest {
  declare currentUser: IUser

  declare input: CreatePropMapBindingInput
}
