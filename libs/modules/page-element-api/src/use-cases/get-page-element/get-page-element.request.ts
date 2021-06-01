import { JwtPayload } from '@codelab/modules/auth-api'
import { GetPageElementInput } from './get-page-element.input'

export class GetPageElementRequest {
  declare input: GetPageElementInput

  declare currentUser?: JwtPayload
}
