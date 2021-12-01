import type { IUser } from '@codelab/shared/abstract/core'
import { CreatePropInput } from './create-prop.input'

export class CreatePropRequest {
  declare input: CreatePropInput

  declare currentUser: IUser
}
