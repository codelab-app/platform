import { DeleteUserRequest } from './DeleteUserRequest'
import { DeleteUserResponse } from './DeleteUserResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeleteUserUseCase = TransactionalUseCase<
  DeleteUserRequest,
  DeleteUserResponse
>
