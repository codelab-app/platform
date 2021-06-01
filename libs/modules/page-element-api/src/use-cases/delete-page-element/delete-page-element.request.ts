import { JwtPayload } from '@codelab/modules/auth-api'
import { DeletePageElementInput } from './delete-page-element.input'

export class DeletePageElementRequest {
  declare input: DeletePageElementInput

  declare currentUser: JwtPayload
}
