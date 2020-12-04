import { CreateUserDto } from '../../../domain/dtos/CreateUserDto'
import { CreateUserResponse } from './CreateUserResponse'
import { TransactionalUseCase } from '@codelab/ddd/shared/core'

export type CreateUserUseCase = TransactionalUseCase<
  CreateUserDto,
  CreateUserResponse
  // UserUseCaseDto
>
