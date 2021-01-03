import { CreateAppRequest } from './CreateAppRequest'
import { CreateAppResponse } from './CreateAppResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type CreateAppUseCase = TransactionalUseCase<
  CreateAppRequest,
  CreateAppResponse
>
