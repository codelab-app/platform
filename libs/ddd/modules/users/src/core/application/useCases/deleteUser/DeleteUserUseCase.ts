import { DeleteUserRequest } from './DeleteUserRequest'
import { DeleteUserResponse } from './DeleteUserResponse'
import { TransactionalUseCase } from '@codelab/ddd/backend'

export type DeleteUserUseCase = TransactionalUseCase<
  DeleteUserRequest,
  DeleteUserResponse
>
