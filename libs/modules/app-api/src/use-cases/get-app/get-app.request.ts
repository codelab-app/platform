import { JwtPayload } from '@codelab/modules/auth-api'
import { GetAppInput } from './get-app.input'

export class GetAppRequest {
  declare input: GetAppInput

  declare currentUser?: JwtPayload
}
