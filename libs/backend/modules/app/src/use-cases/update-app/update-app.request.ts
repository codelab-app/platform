import { JwtPayload } from '@codelab/backend/infra'
import { UpdateAppInput } from './update-app.input'

export class UpdateAppRequest {
  declare input: UpdateAppInput

  declare currentUser?: JwtPayload
}
