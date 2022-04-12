import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import getElementGraphCypher from './getElementGraph.cypher'

export const elementRepository = {
  getElementGraph: (txn: RxTransaction, rootId: string): Observable<any> =>
    txn
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
      ),
}
