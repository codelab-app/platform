import { JwtPayload } from '@codelab/backend/infra'
import { DeletePageInput } from './delete-page.input'

export class DeletePageRequest {
  declare input: DeletePageInput

  declare currentUser?: JwtPayload
}
