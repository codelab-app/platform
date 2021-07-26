import { JwtPayload } from '@codelab/backend'
import { MoveElementInput } from './move-element.input'

export class MoveElementRequest {
  declare input: MoveElementInput

  declare currentUser?: JwtPayload
}
