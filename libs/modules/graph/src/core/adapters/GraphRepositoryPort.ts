import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import { FindGraphBy } from '../../common/CommonTypes'
import { Graph } from '../domain/graph/graph'

export interface GraphRepositoryPort {
  findAll(): Promise<Array<Graph>>
  createGraph(graph: Graph): Promise<Graph>
  updateGraph(graph: Graph): Promise<Graph>
  findGraphBy(by: FindGraphBy): Promise<Option<Graph>>
  addGraphToPage(page: Page): Promise<Graph>
}
