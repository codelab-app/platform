import { JwtPayload } from '@codelab/backend'
import { UpdateComponentInput } from './update-component.input'

export class UpdateComponentRequest {
  declare input: UpdateComponentInput

  declare currentUser?: JwtPayload
}
