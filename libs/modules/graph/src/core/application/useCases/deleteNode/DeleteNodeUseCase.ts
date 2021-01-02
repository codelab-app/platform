import { DeleteNodeRequest } from './DeleteNodeRequest'
import { DeleteNodeResponse } from './DeleteNodeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeleteNodeUseCase = TransactionalUseCase<
  DeleteNodeRequest,
  DeleteNodeResponse
>
