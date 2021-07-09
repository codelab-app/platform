import { JwtPayload } from '@codelab/backend/adapters'
import { UpdateElementInput } from './update-element.input'

export class UpdateElementRequest {
  declare input: UpdateElementInput

  declare currentUser: JwtPayload
}
