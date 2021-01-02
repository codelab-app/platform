import { DeleteNodeRequest } from '../useCases/DeleteNode/DeleteNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteNodeCommand
  implements UseCaseRequestPort<DeleteNodeRequest> {
  constructor(public readonly request: DeleteNodeRequest) {}
}
