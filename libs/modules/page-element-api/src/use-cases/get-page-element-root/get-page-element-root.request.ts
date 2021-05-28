import { JwtPayload } from '@codelab/backend'
import { GetPageElementInput } from '../get-page-element'

export class GetPageElementRootRequest {
  declare input: GetPageElementInput

  declare currentUser: JwtPayload
}
