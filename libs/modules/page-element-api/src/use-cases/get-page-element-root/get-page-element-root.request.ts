import { JwtPayload } from '@codelab/modules/auth-api'
import { GetPageElementInput } from '../get-page-element'

export class GetPageElementRootRequest {
  declare input: GetPageElementInput

  declare currentUser: JwtPayload
}
