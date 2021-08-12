import { JwtPayload } from '@codelab/backend/infra'
import { MoveElementInput } from './move-element.input'

export class MoveElementRequest {
  declare input: MoveElementInput

  declare currentUser?: JwtPayload
}
