import type { User } from '@codelab/shared/abstract/core'
import { DeleteAppInput } from './delete-app.input'

export class DeleteAppRequest {
  declare input: DeleteAppInput

  declare currentUser: User
}
