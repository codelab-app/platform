import { JwtPayload } from '@codelab/backend/infra'
import { GetPageInput } from './get-page.input'

export class GetPageRequest {
  declare input: GetPageInput

  declare currentUser?: JwtPayload
}
