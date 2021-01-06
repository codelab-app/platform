import { GetAppsRequest } from './GetAppsRequest'
import { GetAppsResponse } from './GetAppsResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetAppsUseCase = TransactionalUseCase<
  GetAppsRequest,
  GetAppsResponse
>
