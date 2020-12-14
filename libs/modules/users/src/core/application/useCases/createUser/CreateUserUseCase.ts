import { CreateUserRequest } from './CreateUserRequest'
import { CreateUserResponse } from './CreateUserResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreateUserUseCase = TransactionalUseCase<
  CreateUserRequest,
  CreateUserResponse
>
