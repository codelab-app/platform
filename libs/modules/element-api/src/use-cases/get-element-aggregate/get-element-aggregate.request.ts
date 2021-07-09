import { JwtPayload } from '@codelab/backend/adapters'
import { GetElementInput } from '../get-element'

export class GetElementAggregateRequest {
  declare input: GetElementInput

  declare currentUser: JwtPayload
}
