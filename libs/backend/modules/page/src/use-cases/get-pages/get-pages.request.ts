import { JwtPayload } from '@codelab/backend/infra'
import { GetPagesInput } from './get-pages.input'

export class GetPagesRequest {
  declare input: GetPagesInput

  declare currentUser?: JwtPayload
}
