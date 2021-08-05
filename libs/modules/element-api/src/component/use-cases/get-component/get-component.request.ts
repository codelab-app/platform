import { JwtPayload } from '@codelab/backend'
import { GetComponentInput } from './get-component.input'

export class GetComponentRequest {
  declare input: GetComponentInput

  declare currentUser?: JwtPayload
}
