import { RegisterUserRequest } from './RegisterUserRequest'
import { RegisterUserResponse } from './RegisterUserResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type RegisterUserUseCase = TransactionalUseCase<
  RegisterUserRequest,
  RegisterUserResponse
>
