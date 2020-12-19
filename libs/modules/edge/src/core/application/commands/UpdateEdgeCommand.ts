import { UpdateEdgeRequest } from '../useCases/updateEdge/UpdateEdgeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateEdgeCommand
  implements UseCaseRequestPort<UpdateEdgeRequest> {
  constructor(public readonly request: UpdateEdgeRequest) {}
}
