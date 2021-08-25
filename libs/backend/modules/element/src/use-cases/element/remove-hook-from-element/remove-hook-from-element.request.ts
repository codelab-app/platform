import { User } from '@codelab/shared/abstract/core'
import { RemoveHookFromElementInput } from './remove-hook-from-element.input'

export class RemoveHookFromElementRequest {
  declare input: RemoveHookFromElementInput

  declare currentUser: User
}
