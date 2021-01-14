import { GetPageRequest } from './GetPageRequest'
import { GetPageResponse } from './GetPageResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetPageUseCase = TransactionalUseCase<
  GetPageRequest,
  GetPageResponse
>
