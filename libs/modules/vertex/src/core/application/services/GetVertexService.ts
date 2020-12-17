import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { Vertex } from '../../domain/vertex'

export class GetVertexService {
  constructor(private readonly repository: VertexRepositoryPort) {}

  async execute(): Promise<Array<Vertex>> {
    return this.repository.findAll()
  }
}
