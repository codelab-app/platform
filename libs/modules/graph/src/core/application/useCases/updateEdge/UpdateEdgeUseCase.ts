import { UpdateEdgeRequest } from './UpdateEdgeRequest'
import { UpdateEdgeResponse } from './UpdateEdgeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type UpdateEdgeUseCase = TransactionalUseCase<
  UpdateEdgeRequest,
  UpdateEdgeResponse
>
