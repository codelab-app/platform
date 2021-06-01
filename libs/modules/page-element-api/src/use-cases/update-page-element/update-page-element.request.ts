import { JwtPayload } from '@codelab/modules/auth-api'
import { UpdatePageElementInput } from './update-page-element.input'

export class UpdatePageElementRequest {
  declare input: UpdatePageElementInput

  declare currentUser: JwtPayload
}
