import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { DeleteAppInput } from './delete-app.input'

export interface DeleteAppRequest extends WithCurrentUserRequest {
  input: DeleteAppInput
}
