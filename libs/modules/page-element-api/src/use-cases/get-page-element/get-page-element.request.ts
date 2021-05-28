import { JwtPayload } from '@codelab/backend'
import { GetPageElementInput } from './get-page-element.input'

export class GetPageElementRequest {
  declare input: GetPageElementInput

  declare currentUser?: JwtPayload
}
