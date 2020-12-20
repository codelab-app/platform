import { option as O } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { EdgeRepositoryPort } from '../../adapters/EdgeRepositoryPort'
import { Edge } from '../../domain/edge'
import { GetEdgeErrors } from '../useCases/getEdge/GetEdgeErrors'
import { GetEdgeResponse } from '../useCases/getEdge/GetEdgeResponse'
import { Result } from '@codelab/backend'

export class GetEdgeService {
  constructor(private readonly repository: EdgeRepositoryPort) {}

  async getAllEdges(): Promise<Array<Edge>> {
    return this.repository.findAll()
  }

  async getEdgeById(id: string): Promise<GetEdgeResponse> {
    const edgeOpt: Option<Edge> = await this.repository.findEdge({ id })

    if (O.isNone(edgeOpt)) {
      return left(new GetEdgeErrors.EdgeNotFoundError(id))
    }

    return right(Result.ok(edgeOpt.value))
  }

  async getEdgesByGraphId(graph_id: string): Promise<Array<Edge>> {
    return this.repository.findEdges({ graph_id })
  }
}
