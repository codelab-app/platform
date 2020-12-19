import { DeleteEdgeRequest } from '../useCases/deleteEdge/DeleteEdgeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteEdgeCommand
  implements UseCaseRequestPort<DeleteEdgeRequest> {
  constructor(public readonly request: DeleteEdgeRequest) {}
}
