import { CreateGraphRequest } from './CreateGraphRequest'
import { CreateGraphResponse } from './CreateGraphResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreateGraphUseCase = TransactionalUseCase<
  CreateGraphRequest,
  CreateGraphResponse
>
