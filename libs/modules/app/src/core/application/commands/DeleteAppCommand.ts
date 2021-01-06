import { DeleteAppRequest } from '../useCases/deleteApp/DeleteAppRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteAppCommand implements UseCaseRequestPort<DeleteAppRequest> {
  constructor(public readonly request: DeleteAppRequest) {}
}
