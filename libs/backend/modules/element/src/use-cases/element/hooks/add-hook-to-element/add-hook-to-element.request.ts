import { IUser } from '@codelab/shared/abstract/core'
import { AddHookToElementInput } from './add-hook-to-element.input'

export class AddHookToElementRequest {
  declare input: AddHookToElementInput

  declare currentUser: IUser
}
