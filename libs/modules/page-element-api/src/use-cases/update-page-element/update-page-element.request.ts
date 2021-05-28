import { JwtPayload } from '@codelab/backend'
import { UpdatePageElementInput } from './update-page-element.input'

export class UpdatePageElementRequest {
  declare input: UpdatePageElementInput

  declare currentUser: JwtPayload
}
