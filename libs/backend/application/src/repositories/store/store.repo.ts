import { getStoreGraph } from '@codelab/backend/adapter/neo4j'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export const storeRepository = {
  getStoreGraph: (txn: RxTransaction, rootId: string): Observable<any> => {
    return txn
      .run(getStoreGraph, { rootId })
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
