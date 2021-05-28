import { JwtPayload } from '@codelab/backend'
import { CreatePageElementInput } from './create-page-element.input'

export class CreatePageElementRequest {
  declare input: CreatePageElementInput

  declare currentUser?: JwtPayload
}
