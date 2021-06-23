import { JwtPayload } from '@codelab/modules/auth-api'
import { CreatePropInput } from './create-prop.input'

export class CreatePropRequest {
  declare input: CreatePropInput

  declare currentUser: JwtPayload
}
