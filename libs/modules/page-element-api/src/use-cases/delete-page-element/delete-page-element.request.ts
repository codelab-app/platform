import { JwtPayload } from '@codelab/backend'
import { DeletePageElementInput } from './delete-page-element.input'

export class DeletePageElementRequest {
  declare input: DeletePageElementInput

  declare currentUser: JwtPayload
}
