import { JwtPayload } from '@codelab/modules/auth-api'
import { UpdateAppInput } from './update-app.input'

export class UpdateAppRequest {
  declare input: UpdateAppInput

  declare currentUser?: JwtPayload
}
