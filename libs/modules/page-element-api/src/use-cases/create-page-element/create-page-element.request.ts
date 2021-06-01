import { JwtPayload } from '@codelab/modules/auth-api'
import { CreatePageElementInput } from './create-page-element.input'

export class CreatePageElementRequest {
  declare input: CreatePageElementInput

  declare currentUser?: JwtPayload
}
