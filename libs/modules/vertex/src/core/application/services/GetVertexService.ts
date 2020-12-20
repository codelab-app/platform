import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Vertex } from '../../domain/vertex'
import { GetVertexErrors } from '../useCases/getVertex/GetVertexErrors'
import { GetVertexResponse } from '../useCases/getVertex/GetVertexResponse'
import { Result } from '@codelab/backend'

export class GetVertexService {
  constructor(private readonly repository: VertexRepositoryPort) {}

  async execute(): Promise<Array<Vertex>> {
    return this.repository.findAll()
  }

  async getVertexById(id: string): Promise<GetVertexResponse> {
    const vertexOpt: Option<Vertex> = await this.repository.findVertex({ id })

    if (O.isNone(vertexOpt)) {
      return left(new GetVertexErrors.VertexNotFoundError(id))
    }

    return right(Result.ok(vertexOpt.value))
  }

  async getVerticesByGraphId(graph_id: string): Promise<Array<Vertex>> {
    return this.repository.findVertices({ graph_id })
  }
}
