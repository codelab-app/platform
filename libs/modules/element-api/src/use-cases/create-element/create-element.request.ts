import { JwtPayload } from '@codelab/backend/adapters'
import { CreateElementInput } from './create-element.input'

export class CreateElementRequest {
  declare input: CreateElementInput

  declare currentUser?: JwtPayload
}
