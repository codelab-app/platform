import { JwtPayload } from '@codelab/backend'
import { DeleteAppInput } from './delete-app.input'

export class DeleteAppRequest {
  declare input: DeleteAppInput

  declare currentUser?: JwtPayload
}
