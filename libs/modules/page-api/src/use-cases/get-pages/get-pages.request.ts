import { JwtPayload } from '@codelab/backend/adapters'
import { GetPagesInput } from './get-pages.input'

export class GetPagesRequest {
  declare input: GetPagesInput

  declare currentUser?: JwtPayload
}
