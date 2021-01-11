import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import { ByGraphCondition } from '../../common/QueryConditions'
import { isGraphId, isPageId } from '../../common/utils'
import { GraphRepositoryPort } from '../../core/adapters/GraphRepositoryPort'
import { Graph } from '../../core/domain/graph'
import { NOID, TypeOrmGraph } from '@codelab/backend'

@EntityRepository(TypeOrmGraph)
export class TypeOrmGraphRepositoryAdapter
  extends AbstractRepository<TypeOrmGraph>
  implements GraphRepositoryPort {
  async findAll(): Promise<Array<Graph>> {
    const graphsTypeOrm: Array<TypeOrmGraph> = await this.repository.find()
    const graphs = plainToClass(Graph, graphsTypeOrm)

    return Promise.resolve(graphs)
  }

  async create(graph: Graph<NOID>): Promise<Graph> {
    const newGraph = await this.repository.save({
      ...graph.toPersistence(),
    })

    return plainToClass(Graph, newGraph)
  }

  async delete(): Promise<Option<Graph>> {
    return Promise.resolve(O.none)
  }

  async findMany(): Promise<Array<Graph>> {
    return Promise.resolve([])
  }

  async update(graph: Graph): Promise<Graph> {
    const typeOrmGraph = graph.toPersistence()
    const typeOrmSavedGraph = await this.repository.save(typeOrmGraph)

    return plainToClass(Graph, typeOrmSavedGraph)
  }

  async findOne(graph: ByGraphCondition): Promise<Option<Graph>> {
    let typeOrmGraph: TypeOrmGraph | undefined

    if (isGraphId(graph)) {
      typeOrmGraph = await this.repository.findOne(graph.graphId, {
        relations: ['vertices', 'edges'],
      })
    }

    if (isPageId(graph)) {
      typeOrmGraph = await this.repository.findOne({
        where: { pageId: graph.pageId },
        relations: ['vertices', 'edges'],
      })
    }

    const foundGraph: Graph = plainToClass(Graph, typeOrmGraph)

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

    return plainToClass(Graph, typeOrmSavedGraph)
  }
}
