import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AbstractRepository, EntityManager, EntityRepository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import { ByGraphCondition } from '../../common/QueryConditions'
import { isGraphId } from '../../common/utils'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { NOID, TypeOrmGraph } from '@codelab/backend'

@EntityRepository(TypeOrmGraph)
export class TypeOrmGraphRepositoryAdapter
  extends AbstractRepository<TypeOrmGraph>
  implements GraphRepositoryPort {
  manager: EntityManager = this.manager

  async create(graph: Graph<NOID>): Promise<Graph> {
    const newGraph = await this.repository.save({
      ...graph.toPersistence(),
    })

    return Graph.hydrate(Graph, newGraph)
  }

  async delete({ graphId }: ByGraphCondition): Promise<Option<Graph>> {
    const graph = await this.findOne({ graphId })

    if (O.isNone(graph)) {
      return O.none
    }

    await this.repository.remove(graph.value.id.toString())

    return graph
  }

  async findMany(): Promise<Array<Graph>> {
    return Promise.resolve([])
  }

  async update(graph: Graph): Promise<Graph> {
    const typeOrmGraph = graph.toPersistence()
    let typeOrmSavedGraph

    try {
      typeOrmSavedGraph = await this.repository.save(typeOrmGraph)
    } catch (e) {
      return Promise.reject()
    }

    return Graph.hydrate(Graph, typeOrmSavedGraph)
  }

  async findOne(graph: ByGraphCondition): Promise<Option<Graph>> {
    let typeOrmGraph: TypeOrmGraph | undefined

    if (isGraphId(graph)) {
      typeOrmGraph = await this.repository.findOne(graph.graphId, {
        relations: ['vertices', 'edges'],
      })
    }

    const foundGraph: Graph = Graph.hydrate(Graph, typeOrmGraph)

    return typeOrmGraph ? O.some(foundGraph) : O.none
  }

  async addGraphToPage(page: Page): Promise<Graph> {
    const typeOrmPage = page.toPersistence()
    const newGraph = new Graph({
      label: typeOrmPage.title,
    })
    const typeOrmSavedGraph = await this.repository.save({
      ...newGraph.toPersistence(),
      page: typeOrmPage,
    })

    return Graph.hydrate(Graph, typeOrmSavedGraph)
  }
}
