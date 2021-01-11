import { GetAppRequest } from './GetAppRequest'
import { GetAppResponse } from './GetAppResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetAppUseCase = TransactionalUseCase<GetAppRequest, GetAppResponse>
