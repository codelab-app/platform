import { JwtPayload } from '@codelab/backend'
import { CreatePageInput } from './create-page.input'

export class CreatePageRequest {
  declare input: CreatePageInput

  declare currentUser?: JwtPayload
}
