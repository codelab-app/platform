import { Option } from 'fp-ts/Option'
import { EntityManager } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import {
  ByGraphCondition,
  ByGraphConditions,
} from '../../common/QueryConditions'
import { Graph } from '../domain/graph'
import { NOID } from '@codelab/backend'

export abstract class GraphRepositoryPort {
  abstract manager?: EntityManager

  abstract findAll(): Promise<Array<Graph>>

  abstract createGraph(graph: Graph<NOID>): Promise<Graph>

  abstract updateGraph(graph: Graph): Promise<Graph>

  abstract deleteGraph(graphId: string): Promise<Option<Graph>>

  abstract findSingle(graph: ByGraphCondition): Promise<Option<Graph>>

  abstract findMany(graphs: ByGraphConditions): Promise<Array<Graph>>

  abstract addGraphToPage(page: Page): Promise<Graph>
}
