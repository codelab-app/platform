import { User } from '@codelab/shared/abstract/core'
import { CreateElementInput } from './create-element.input'

export class CreateElementRequest {
  declare input: CreateElementInput

  declare currentUser: User
}
