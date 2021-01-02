import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Edge } from '../../domain/edge'
import { Graph } from '../../domain/graph'
import { MoveNodeRequest } from '../useCases/MoveNode/MoveNodeRequest'
import { MoveNodeResponse } from '../useCases/MoveNode/MoveNodeResponse'
import { MoveNodeUseCase } from '../useCases/MoveNode/MoveNodeUseCase'
import { UpdateNodeErrors } from '../useCases/UpdateNode/UpdateNodeErrors'
import { Result } from '@codelab/backend'

export class MoveNodeService implements MoveNodeUseCase {
  constructor(
    private readonly graphRepository: GraphRepositoryPort,
    private readonly edgeRepository: EdgeRepositoryPort,
  ) {}

  async execute(request: MoveNodeRequest): Promise<MoveNodeResponse> {
    const { graphId, type } = request

    const graphOpt: Option<Graph> = await this.graphRepository.findGraphBy(
      {
        id: graphId,
      },
      true,
    )

    if (isNone(graphOpt)) {
      return left(new UpdateNodeErrors.GraphNotFoundError(graphId))
    }

    const graph: Graph = graphOpt.value

    graph.moveVertex(type.source, type.target)
    const edges: Array<Edge> = graph.getEdgesDomain()

    await this.edgeRepository.updateEdges(edges)

    return right(Result.ok(graph))
  }
}
