import { UserUseCaseDto } from '../UserUseCaseDto'
import { CreateUserRequest } from './CreateUserRequest'
import { TransactionalUseCase } from '@codelab/ddd/shared/core'

export type CreateUserUseCase = TransactionalUseCase<
  CreateUserRequest,
  UserUseCaseDto
>
