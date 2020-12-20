import { GraphRepositoryPort } from '../../adapters/GraphRepositoryPort'
import { Graph } from '../../domain/graph'

export class GetGraphService {
  constructor(private readonly repository: GraphRepositoryPort) {}

  async findAll(): Promise<Array<Graph>> {
    return this.repository.findAll()
  }
}
