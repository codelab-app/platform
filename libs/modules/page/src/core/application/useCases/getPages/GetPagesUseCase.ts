import { GetPagesRequest } from './GetPagesRequest'
import { GetPagesResponse } from './GetPagesResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetPagesUseCase = TransactionalUseCase<
  GetPagesRequest,
  GetPagesResponse
>
