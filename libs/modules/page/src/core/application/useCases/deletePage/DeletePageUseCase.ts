import { DeletePageRequest } from './DeletePageRequest'
import { DeletePageResponse } from './DeletePageResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeletePageUseCase = TransactionalUseCase<
  DeletePageRequest,
  DeletePageResponse
>
