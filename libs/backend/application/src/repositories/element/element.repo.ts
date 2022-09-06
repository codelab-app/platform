import { getElementGraph } from '@codelab/backend/adapter/neo4j'
import { RxTransaction, Transaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export const elementRepository = {
  getElementGraph: (
    txn: RxTransaction,
    rootId: string,
  ): Observable<unknown> => {
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

  /**
   * Create an async version
   */
  getDescendants: (txn: Transaction, rootId: string): Promise<unknown> => {
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const results = txn.run(getElementGraph, { rootId })

    console.log(results)

    return results
  },
}
