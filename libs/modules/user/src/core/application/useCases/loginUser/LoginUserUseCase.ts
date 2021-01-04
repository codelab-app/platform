import { LoginUserRequest } from './LoginUserRequest'
import { LoginUserResponse } from './LoginUserResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type LoginUserUseCase = TransactionalUseCase<
  LoginUserRequest,
  LoginUserResponse
>
