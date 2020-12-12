import { EditUserRequest } from './EditUserRequest'
import { EditUserResponse } from './EditUserResponse'
import { TransactionalUseCase } from '@codelab/ddd/backend'

export type EditUserUseCase = TransactionalUseCase<
  EditUserRequest,
  EditUserResponse
>
