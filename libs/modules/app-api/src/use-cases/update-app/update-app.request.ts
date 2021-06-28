import { JwtPayload } from '@codelab/backend/adapters'
import { UpdateAppInput } from './update-app.input'

export class UpdateAppRequest {
  declare input: UpdateAppInput

  declare currentUser?: JwtPayload
}
