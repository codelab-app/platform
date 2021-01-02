import { Option } from 'fp-ts/Option'
import { FindGraphBy } from '../../common/CommonTypes'
import { Graph } from '../domain/graph/graph'

export interface GraphRepositoryPort {
  findAll(): Promise<Array<Graph>>
  createGraph(graph: Graph): Promise<Graph>
  findGraphBy(
    by: FindGraphBy,
    includeRelations?: boolean,
  ): Promise<Option<Graph>>
}
