import { JwtPayload } from '@codelab/backend/infra'
import { DeleteUserInput } from './delete-user.input'

export class DeleteUserRequest {
  declare input: DeleteUserInput

  declare currentUser?: JwtPayload
}
