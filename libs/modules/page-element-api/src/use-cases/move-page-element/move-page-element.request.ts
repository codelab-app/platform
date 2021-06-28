import { JwtPayload } from '@codelab/backend/adapters'
import { MovePageElementInput } from './move-page-element.input'

export class MovePageElementRequest {
  declare input: MovePageElementInput

  declare currentUser?: JwtPayload
}
