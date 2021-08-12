import { JwtPayload } from '@codelab/backend/infra'
import { DeleteComponentInput } from './delete-component.input'

export class DeleteComponentRequest {
  declare input: DeleteComponentInput

  declare currentUser?: JwtPayload
}
