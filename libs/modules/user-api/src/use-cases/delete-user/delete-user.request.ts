import { JwtPayload } from '@codelab/modules/auth-api'
import { DeleteUserInput } from './delete-user.input'

export class DeleteUserRequest {
  declare input: DeleteUserInput

  declare currentUser?: JwtPayload
}
