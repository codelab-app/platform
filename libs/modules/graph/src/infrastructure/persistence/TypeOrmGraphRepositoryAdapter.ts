import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import { FindGraphBy } from '../../common/CommonTypes'
import { isGraphId, isPageId } from '../../common/utils'
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

  async updateGraph(graph: Graph): Promise<Graph> {
    const typeOrmGraph = graph.toPersistence()
    const typeOrmSavedGraph = await this.save(typeOrmGraph)

    return plainToClass(Graph, typeOrmSavedGraph)
  }

  async findGraphBy(by: FindGraphBy): Promise<Option<Graph>> {
    let typeOrmGraph

    if (isGraphId(by)) {
      typeOrmGraph = await this.findOne(by.id, {
        relations: ['vertices', 'edges'],
      })
    }

    if (isPageId(by)) {
      typeOrmGraph = await this.findOne({
        where: { pageId: by.pageId },
        relations: ['vertices', 'edges'],
      })
    }

    const graph: Graph = plainToClass(Graph, typeOrmGraph)

    return typeOrmGraph ? Promise.resolve(O.some(graph)) : O.none
  }

  async addGraphToPage(page: Page): Promise<Graph> {
    const typeOrmPage = page.toPersistence()
    const newGraph = Graph.create({
      label: typeOrmPage.title,
    })
    const typeOrmGraph = newGraph.toPersistence()

    typeOrmGraph.page = typeOrmPage
    const typeOrmSavedGraph = await this.save(typeOrmGraph)

    return plainToClass(Graph, typeOrmSavedGraph)
  }
}
