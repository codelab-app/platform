import { DeleteVertexRequest } from './DeleteVertexRequest'
import { DeleteVertexResponse } from './DeleteVertexResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeleteVertexUseCase = TransactionalUseCase<
  DeleteVertexRequest,
  DeleteVertexResponse
>
