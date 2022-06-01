import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import getStoreGraphCypher from './getStoreGraph.cypher'

export const storeRepository = {
  getStoreGraph: (txn: RxTransaction, rootId: string): Observable<any> => {
    return txn
      .run(getStoreGraphCypher, { rootId })
      .records()
      .pipe(
        map((record) => {
          const store = record.get(0)
          const descendants = record.get(1)

          const storeGraph = {
            ...store,
            descendants,
          }

          return storeGraph
        }),
      )
  },
}
