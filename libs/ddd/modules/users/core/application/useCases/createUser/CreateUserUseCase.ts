import { CreateUserRequest } from './CreateUserRequest'
import { CreateUserResponse } from './CreateUserResponse'
import { TransactionalUseCase } from '@codelab/ddd/shared/core'

export type CreateUserUseCase = TransactionalUseCase<
  CreateUserRequest,
  CreateUserResponse
  // UserUseCaseDto
>
