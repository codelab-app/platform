import { JwtPayload } from '@codelab/backend/adapters'
import { GetPageRootInput } from './get-page-root.input'

export class GetPageRootRequest {
  declare input: GetPageRootInput

  declare currentUser?: JwtPayload
}
