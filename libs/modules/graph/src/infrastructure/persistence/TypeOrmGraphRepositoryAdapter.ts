import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { Page } from '../../../../page/src/core/domain/page'
import { ByGraphCondition } from '../../common/QueryConditions'
import { isGraphId, isPageId } from '../../common/utils'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { NOID, TypeOrmGraph } from '@codelab/backend'

@EntityRepository(TypeOrmGraph)
export class TypeOrmGraphRepositoryAdapter
  extends BaseRepository<TypeOrmGraph>
  implements GraphRepositoryPort {
  async findAll(): Promise<Array<Graph>> {
    const graphsTypeOrm: Array<TypeOrmGraph> = await this.find()

    return Graph.hydrateArray(Graph, graphsTypeOrm)
  }

  async createGraph(graph: Graph<NOID>): Promise<Graph> {
    const newGraph = await this.save({
      ...graph.toPersistence(),
    })

    return Graph.hydrate(Graph, newGraph)
  }

  async deleteGraph(graph: Graph): Promise<Option<Graph>> {
    const typeOrmGraph = graph.toPersistence()
    const foundTypeOrmGraph = await this.findOne(typeOrmGraph.id)

    if (!foundTypeOrmGraph) {
      return O.none
    }

    await this.remove(foundTypeOrmGraph)

    return O.some(graph)
  }

  async findMany(): Promise<Array<Graph>> {
    return Promise.resolve([])
  }

  async updateGraph(graph: Graph): Promise<Graph> {
    const typeOrmGraph = graph.toPersistence()
    let typeOrmSavedGraph

    try {
      typeOrmSavedGraph = await this.save(typeOrmGraph)
    } catch (e) {
      return Promise.reject()
    }

    return Graph.hydrate(Graph, typeOrmSavedGraph)
  }

  async findSingle(graph: ByGraphCondition): Promise<Option<Graph>> {
    let typeOrmGraph: TypeOrmGraph | undefined

    if (isGraphId(graph)) {
      typeOrmGraph = await this.findOne(graph.graphId, {
        relations: ['vertices', 'edges'],
      })
    }

    if (isPageId(graph)) {
      typeOrmGraph = await this.findOne({
        where: { pageId: graph.pageId },
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
    const typeOrmSavedGraph = await this.save({
      ...newGraph.toPersistence(),
      page: typeOrmPage,
    })

    return Graph.hydrate(Graph, typeOrmSavedGraph)
  }
}
