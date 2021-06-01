import { JwtPayload } from '@codelab/modules/auth-api'
import { GetPageRootInput } from './get-page-root.input'

export class GetPageRootRequest {
  declare input: GetPageRootInput

  declare currentUser?: JwtPayload
}
