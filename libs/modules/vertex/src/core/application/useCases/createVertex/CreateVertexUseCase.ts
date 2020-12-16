import { CreateVertexRequest } from './CreateVertexRequest'
import { CreateVertexResponse } from './CreateVertexResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreateVertexUseCase = TransactionalUseCase<
  CreateVertexRequest,
  CreateVertexResponse
>
