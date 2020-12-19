import { CreateEdgeRequest } from './CreateEdgeRequest'
import { CreateEdgeResponse } from './CreateEdgeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreateEdgeUseCase = TransactionalUseCase<
  CreateEdgeRequest,
  CreateEdgeResponse
>
