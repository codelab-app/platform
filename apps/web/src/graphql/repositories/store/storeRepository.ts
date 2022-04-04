import { GetStoresGraphsInput } from '@codelab/shared/abstract/codegen-v2'
import { DeleteInfo } from '@neo4j/graphql'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import { StoreEdge } from '../../ogm-types.gen'
import deleteStoresSubGraphCypher from './deleteStoresSubGraph.cypher'
import getStoresGraphsCypher from './getStoresGraphs.cypher'

export type GetStoresGraphsResponse = {
  edges: Array<StoreEdge>
}

export type DeleteStoresResponse = {
  deletedIds?: Array<string>
  nodesDeleted: number
  relationshipsDeleted: number
}

export const storeRepository = {
  getStoresGraphsEdges: (
    txn: RxTransaction,
    input: GetStoresGraphsInput,
  ): Observable<GetStoresGraphsResponse> =>
    txn
      .run(getStoresGraphsCypher, { rootId: input.rootId || null })
      .records()
      .pipe(
        map((response) => ({
          edges: response.get('edges') as Array<StoreEdge>,
        })),
      ),

  deleteStoresSubgraph: (
    txn: RxTransaction,
    ids: Array<string>,
  ): Observable<DeleteInfo> =>
    txn
      .run(deleteStoresSubGraphCypher, { ids })
      .records()
      .pipe(
        map((response) => ({
          nodesDeleted: response.get('nodesDeleted').toString(),
          relationshipsDeleted: response.get('relationshipsDeleted').toString(),
          deletedIds: response.get('deletedIds'),
        })),
      ),
}
