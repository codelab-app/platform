import { JwtPayload } from '@codelab/backend/adapters'
import { DeletePageInput } from './delete-page.input'

export class DeletePageRequest {
  declare input: DeletePageInput

  declare currentUser?: JwtPayload
}
