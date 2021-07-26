import { JwtPayload } from '@codelab/backend'
import { GetAppInput } from './get-app.input'

export class GetAppRequest {
  declare input: GetAppInput

  declare currentUser?: JwtPayload
}
