import { UpdateVertexRequest } from './UpdateVertexRequest'
import { UpdateVertexResponse } from './UpdateVertexResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type UpdateVertexUseCase = TransactionalUseCase<
  UpdateVertexRequest,
  UpdateVertexResponse
>
