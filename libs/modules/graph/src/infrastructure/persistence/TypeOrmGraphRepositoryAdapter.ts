import { plainToClass } from 'class-transformer'
import { EntityRepository, Repository } from 'typeorm'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { TypeOrmGraph } from '@codelab/backend'

@EntityRepository(TypeOrmGraph)
export class TypeOrmGraphRepositoryAdapter
  extends Repository<TypeOrmGraph>
  implements GraphRepositoryPort {
  async findAll(): Promise<Array<Graph>> {
    const graphsTypeOrm: Array<TypeOrmGraph> = await this.find()
    const graphs = plainToClass(Graph, graphsTypeOrm)

    return Promise.resolve(graphs)
  }

  async createGraph(graph: Graph): Promise<Graph> {
    const typeOrmGraph = graph.toPersistence()
    const newGraph = await this.save(typeOrmGraph)

    return plainToClass(Graph, newGraph)
  }
}
