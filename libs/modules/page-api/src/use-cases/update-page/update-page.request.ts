import { JwtPayload } from '@codelab/backend/adapters'
import { UpdatePageInput } from './update-page.input'

export class UpdatePageRequest {
  declare input: UpdatePageInput

  declare currentUser?: JwtPayload
}
