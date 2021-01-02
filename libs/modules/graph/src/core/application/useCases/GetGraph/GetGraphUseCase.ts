import { GetGraphRequest } from './GetGraphRequest'
import { GetGraphResponse } from './GetGraphResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetGraphUseCase = TransactionalUseCase<
  GetGraphRequest,
  GetGraphResponse
>
