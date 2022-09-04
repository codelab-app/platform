import { getElementGraph } from '@codelab/backend/adapter/neo4j'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export const elementRepository = {
  getElementGraph: (txn: RxTransaction, rootId: string): Observable<any> => {
    return txn
      .run(getElementGraph, { rootId })
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
