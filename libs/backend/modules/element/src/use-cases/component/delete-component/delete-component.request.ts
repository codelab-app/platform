import type { User } from '@codelab/shared/abstract/core'
import { DeleteComponentInput } from './delete-component.input'

export class DeleteComponentRequest {
  declare input: DeleteComponentInput

  declare currentUser: User
}
