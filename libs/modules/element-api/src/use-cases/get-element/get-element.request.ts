import { JwtPayload } from '@codelab/backend/adapters'
import { GetElementInput } from './get-element.input'

export class GetElementRequest {
  declare input: GetElementInput

  declare currentUser?: JwtPayload
}
