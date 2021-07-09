import { JwtPayload } from '@codelab/backend/adapters'
import { DeleteElementInput } from './delete-element.input'

export class DeleteElementRequest {
  declare input: DeleteElementInput

  declare currentUser: JwtPayload
}
