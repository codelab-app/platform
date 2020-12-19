import { DeleteVertexRequest } from '../useCases/deleteVertex/DeleteVertexRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class DeleteVertexCommand
  implements UseCaseRequestPort<DeleteVertexRequest> {
  constructor(public readonly request: DeleteVertexRequest) {}
}
