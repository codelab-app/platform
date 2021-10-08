import type { IUser } from '@codelab/shared/abstract/core'
import { DeletePropMapBindingInput } from './delete-prop-map-binding.input'

export class DeletePropMapBindingRequest {
  declare currentUser: IUser

  declare input: DeletePropMapBindingInput
}
