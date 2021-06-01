import { JwtPayload } from '@codelab/modules/auth-api'
import { GetPagesInput } from './get-pages.input'

export class GetPagesRequest {
  declare input: GetPagesInput

  declare currentUser?: JwtPayload
}
