import { JwtPayload } from '@codelab/backend/adapters'
import { DeletePageElementInput } from './delete-page-element.input'

export class DeletePageElementRequest {
  declare input: DeletePageElementInput

  declare currentUser: JwtPayload
}
