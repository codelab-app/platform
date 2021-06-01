import { JwtPayload } from '@codelab/modules/auth-api'
import { DeletePageInput } from './delete-page.input'

export class DeletePageRequest {
  declare input: DeletePageInput

  declare currentUser?: JwtPayload
}
