import { JwtPayload } from '@codelab/backend/adapters'
import { GetPageElementInput } from '../get-page-element'

export class GetPageElementRootRequest {
  declare input: GetPageElementInput

  declare currentUser: JwtPayload
}
