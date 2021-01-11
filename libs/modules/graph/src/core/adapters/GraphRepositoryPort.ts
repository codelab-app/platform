import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import {
  ByGraphCondition,
  ByGraphConditions,
} from '../../common/QueryConditions'
import { Graph } from '../domain/graph'
import { NOID, RepositoryPort } from '@codelab/backend'

export abstract class GraphRepositoryPort implements RepositoryPort<Graph> {
  abstract findAll(): Promise<Array<Graph>>

  abstract create(graph: Graph<NOID>): Promise<Graph>

  abstract update(graph: Graph): Promise<Graph>

  abstract delete(graphId: string): Promise<Option<Graph>>

  abstract findOne(graph: ByGraphCondition): Promise<Option<Graph>>

  abstract findMany(graphs: ByGraphConditions): Promise<Array<Graph>>

  abstract addGraphToPage(page: Page): Promise<Graph>
}
