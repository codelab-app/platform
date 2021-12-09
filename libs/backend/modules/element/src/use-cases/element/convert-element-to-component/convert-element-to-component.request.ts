import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { ConvertElementToComponentInput } from './convert-element-to-component.input'

export class ConvertElementToComponentRequest
  implements WithCurrentUserRequest
{
  declare input: ConvertElementToComponentInput

  declare currentUser: IUser
}
