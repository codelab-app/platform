import { GetVertexByIdRequest } from '../useCases/getVertex/GetVertexByIdRequest'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetVertexByIdQuery
  implements UseCaseRequestPort<GetVertexByIdRequest> {
  constructor(public readonly request: GetVertexByIdRequest) {}
}
