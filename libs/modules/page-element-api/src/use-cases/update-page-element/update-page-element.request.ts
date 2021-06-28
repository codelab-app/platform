import { JwtPayload } from '@codelab/backend/adapters'
import { UpdatePageElementInput } from './update-page-element.input'

export class UpdatePageElementRequest {
  declare input: UpdatePageElementInput

  declare currentUser: JwtPayload
}
