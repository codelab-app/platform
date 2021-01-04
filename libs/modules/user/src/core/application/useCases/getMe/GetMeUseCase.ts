import { GetMeRequest } from './GetMeRequest'
import { GetMeResponse } from './GetMeResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type GetMeUseCase = TransactionalUseCase<GetMeRequest, GetMeResponse>
