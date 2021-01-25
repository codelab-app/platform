import { Option } from 'fp-ts/Option'
import { Graph } from '../domain/graph/graph'
import { GraphDTO, GraphVO } from '../domain/graph/graph.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class GraphRepositoryPort implements RepositoryPort<Graph> {
  abstract create(graph: GraphVO): Promise<Option<Graph>>

  abstract update(where: GraphDTO, data: GraphDTO): Promise<Option<Graph>>

  abstract delete(graph: GraphDTO): Promise<Option<Graph>>

  abstract findOne(where: GraphDTO): Promise<Option<Graph>>

  // abstract findMany(where: GraphDTO): Promise<Array<Graph>>

  // abstract addGraphToPage(page: Page): Promise<Graph>
}
