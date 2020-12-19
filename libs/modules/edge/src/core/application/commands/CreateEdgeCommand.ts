import { CreateEdgeRequest } from '../useCases/createEdge/CreateEdgeRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class CreateEdgeCommand
  implements UseCaseRequestPort<CreateEdgeRequest> {
  constructor(public readonly request: CreateEdgeRequest) {}
}
