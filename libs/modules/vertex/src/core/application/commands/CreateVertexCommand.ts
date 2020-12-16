import { CreateVertexRequest } from '../useCases/createVertex/CreateVertexRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class CreateVertexCommand
  implements UseCaseRequestPort<CreateVertexRequest> {
  constructor(public readonly request: CreateVertexRequest) {}
}
