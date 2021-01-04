import { DeleteNodeRequest } from '../useCases/deleteNode/DeleteNodeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteNodeCommand
  implements UseCaseRequestPort<DeleteNodeRequest> {
  constructor(public readonly request: DeleteNodeRequest) {}
}
