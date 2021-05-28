import { JwtPayload } from '@codelab/backend'
import { GetPageRootInput } from './get-page-root.input'

export class GetPageRootRequest {
  declare input: GetPageRootInput

  declare currentUser?: JwtPayload
}
