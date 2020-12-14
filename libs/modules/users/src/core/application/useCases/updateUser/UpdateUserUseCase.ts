import { UpdateUserRequest } from './UpdateUserRequest'
import { UpdateUserResponse } from './UpdateUserResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type UpdateUserUseCase = TransactionalUseCase<
  UpdateUserRequest,
  UpdateUserResponse
>
