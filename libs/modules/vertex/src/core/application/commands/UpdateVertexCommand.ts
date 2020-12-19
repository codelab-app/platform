import { UpdateVertexRequest } from '../useCases/updateVertex/UpdateVertexRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class UpdateVertexCommand
  implements UseCaseRequestPort<UpdateVertexRequest> {
  constructor(public readonly request: UpdateVertexRequest) {}
}
