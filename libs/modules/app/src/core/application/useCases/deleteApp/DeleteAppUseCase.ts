import { DeleteAppRequest } from './DeleteAppRequest'
import { DeleteAppResponse } from './DeleteAppResponse'
import { TransactionalUseCase } from '@codelab/backend'

export type DeleteAppUseCase = TransactionalUseCase<
  DeleteAppRequest,
  DeleteAppResponse
>
