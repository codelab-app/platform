import { JwtPayload } from '@codelab/backend'
import { DeleteComponentInput } from './delete-component.input'

export class DeleteComponentRequest {
  declare input: DeleteComponentInput

  declare currentUser?: JwtPayload
}
