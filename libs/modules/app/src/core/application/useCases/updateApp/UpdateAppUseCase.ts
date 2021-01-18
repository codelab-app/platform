import { UpdateAppRequest } from './UpdateAppRequest'
import { UpdateAppResponse } from './UpdateAppResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type UpdateAppUseCase = TransactionalUseCase<
  UpdateAppRequest,
  UpdateAppResponse
>
