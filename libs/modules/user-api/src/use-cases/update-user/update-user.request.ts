import { JwtPayload } from '@codelab/modules/auth-api'
import { UpdateUserInput } from './update-user.input'

export class UpdateUserRequest {
  declare input: UpdateUserInput

  declare currentUser?: JwtPayload
}
