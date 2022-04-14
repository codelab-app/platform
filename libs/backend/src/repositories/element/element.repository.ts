import { DeleteElementsInfo } from '@codelab/shared/abstract/codegen'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import deleteElementsSubGraphCypher from './deleteElementsSubGraph.cypher'
import getElementGraphCypher from './getElementGraph.cypher'

export type DeleteElementsResponse = {
  deletedIds?: Array<string>
  nodesDeleted: number
  relationshipsDeleted: number
}

export const elementRepository = {
  deleteElementsSubgraph: (
    txn: RxTransaction,
    ids: Array<string>,
  ): Observable<DeleteElementsInfo> =>
    txn
      .run(deleteElementsSubGraphCypher, { ids })
      .records()
      .pipe(
        map((response) => ({
          nodesDeleted: response.get('nodesDeleted').toString(),
          relationshipsDeleted: response.get('relationshipsDeleted').toString(),
          deletedIds: response.get('deletedIds'),
        })),
      ),

  getElementGraph: (txn: RxTransaction, rootId: string): Observable<any> => {
    return txn
      .run(getElementGraphCypher, { rootId })
      .records()
      .pipe(
        map((record) => {
          const element = record.get(0)
          const descendants = record.get(1)

          const elementGraph = {
            ...element,
            descendants,
          }

          return elementGraph
        }),
      )
  },
}
