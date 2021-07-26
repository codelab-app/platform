import { JwtPayload } from '@codelab/backend'
import { GetPageInput } from './get-page.input'

export class GetPageRequest {
  declare input: GetPageInput

  declare currentUser?: JwtPayload
}
