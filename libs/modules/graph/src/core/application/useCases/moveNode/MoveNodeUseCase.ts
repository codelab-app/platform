import { MoveNodeRequest } from './MoveNodeRequest'
import { MoveNodeResponse } from './MoveNodeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type MoveNodeUseCase = TransactionalUseCase<
  MoveNodeRequest,
  MoveNodeResponse
>
