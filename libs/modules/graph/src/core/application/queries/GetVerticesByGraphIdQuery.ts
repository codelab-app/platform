import { GraphUseCaseDto } from '../useCases/GraphUseCaseDto'
import { UseCaseRequestPort } from '@codelab/backend'

export class GetVerticesByGraphIdQuery
  implements UseCaseRequestPort<GraphUseCaseDto> {
  constructor(public readonly request: GraphUseCaseDto) {}
}
