import { JwtPayload } from '@codelab/modules/auth-api'
import { DeleteAppInput } from './delete-app.input'

export class DeleteAppRequest {
  declare input: DeleteAppInput

  declare currentUser?: JwtPayload
}
