import type { User } from '@codelab/shared/abstract/core'
import { DeletePropMapBindingInput } from './delete-prop-map-binding.input'

export class DeletePropMapBindingRequest {
  declare currentUser: User

  declare input: DeletePropMapBindingInput
}
