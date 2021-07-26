import { JwtPayload } from '@codelab/backend'
import { UpdateUserInput } from './update-user.input'

export class UpdateUserRequest {
  declare input: UpdateUserInput

  declare currentUser?: JwtPayload
}
