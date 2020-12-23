import { AddChildNodeRequest } from './AddChildNodeRequest'
import { AddChildNodeResponse } from './AddChildNodeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type AddChildNodeUseCase = TransactionalUseCase<
  AddChildNodeRequest,
  AddChildNodeResponse
>
