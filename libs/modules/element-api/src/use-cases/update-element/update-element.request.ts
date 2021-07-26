import { JwtPayload } from '@codelab/backend'
import { UpdateElementInput } from './update-element.input'

export class UpdateElementRequest {
  declare input: UpdateElementInput

  declare currentUser: JwtPayload
}
