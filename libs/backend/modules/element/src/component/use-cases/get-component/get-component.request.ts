import { JwtPayload } from '@codelab/backend/infra'
import { GetComponentInput } from './get-component.input'

export class GetComponentRequest {
  declare input: GetComponentInput

  declare currentUser?: JwtPayload
}
