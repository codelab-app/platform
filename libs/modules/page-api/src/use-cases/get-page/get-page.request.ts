import { JwtPayload } from '@codelab/modules/auth-api'
import { GetPageInput } from './get-page.input'

export class GetPageRequest {
  declare input: GetPageInput

  declare currentUser?: JwtPayload
}
