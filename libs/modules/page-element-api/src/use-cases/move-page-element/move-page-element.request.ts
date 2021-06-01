import { JwtPayload } from '@codelab/modules/auth-api'
import { MovePageElementInput } from './move-page-element.input'

export class MovePageElementRequest {
  declare input: MovePageElementInput

  declare currentUser?: JwtPayload
}
