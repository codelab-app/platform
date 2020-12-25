import { CreatePageRequest } from './CreatePageRequest'
import { CreatePageResponse } from './CreatePageResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreatePageUseCase = TransactionalUseCase<
  CreatePageRequest,
  CreatePageResponse
>
