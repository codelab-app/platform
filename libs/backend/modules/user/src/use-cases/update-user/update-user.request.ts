import { JwtPayload } from '@codelab/backend/infra'
import { UpdateUserInput } from './update-user.input'

export class UpdateUserRequest {
  declare input: UpdateUserInput

  declare currentUser?: JwtPayload
}
