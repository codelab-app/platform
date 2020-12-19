import { GetEdgeByIdRequest } from '../useCases/getEdge/GetEdgeByIdRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GedEdgeByIdQuery
  implements UseCaseRequestPort<GetEdgeByIdRequest> {
  constructor(public readonly request: GetEdgeByIdRequest) {}
}
