import { JwtPayload } from '@codelab/modules/auth-api'
import { UpdatePageInput } from './update-page.input'

export class UpdatePageRequest {
  declare input: UpdatePageInput

  declare currentUser?: JwtPayload
}
