import { UseCaseRequestPort } from '@codelab/backend'

// Create dto later on
type CreateVertexRequest = {}
export class GetVertexQuery implements UseCaseRequestPort<CreateVertexRequest> {
  constructor(public readonly request: CreateVertexRequest) {}
}
