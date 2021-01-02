import { UpdateNodeRequest } from './UpdateNodeRequest'
import { UpdateNodeResponse } from './UpdateNodeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type UpdateNodeUseCase = TransactionalUseCase<
  UpdateNodeRequest,
  UpdateNodeResponse
>
