import { DeleteEdgeRequest } from './DeleteEdgeRequest'
import { DeleteEdgeResponse } from './DeleteEdgeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeleteEdgeUseCase = TransactionalUseCase<
  DeleteEdgeRequest,
  DeleteEdgeResponse
>
