import { JwtPayload } from '@codelab/backend/adapters'
import { GetPageInput } from './get-page.input'

export class GetPageRequest {
  declare input: GetPageInput

  declare currentUser?: JwtPayload
}
