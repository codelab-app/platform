import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindGraphBy } from '../../common/CommonTypes'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph/graph'
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

  async findGraphBy(
    by: FindGraphBy,
    includeRelations?: boolean,
  ): Promise<Option<Graph>> {
    let typeOrmGraph

    if (includeRelations) {
      typeOrmGraph = await this.findOne(by.id, {
        relations: ['vertices', 'edges'],
      })
    } else {
      typeOrmGraph = await this.findOne(by.id)
    }

    const graph: Graph = plainToClass(Graph, typeOrmGraph)

    return typeOrmGraph ? Promise.resolve(O.some(graph)) : O.none
  }
}
