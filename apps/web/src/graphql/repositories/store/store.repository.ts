import { DeleteInfo } from '@neo4j/graphql'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import deleteStoresSubGraphCypher from './deleteStoresSubGraph.cypher'

export type DeleteStoresResponse = {
  deletedIds?: Array<string>
  nodesDeleted: number
  relationshipsDeleted: number
}

export const storeRepository = {
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
