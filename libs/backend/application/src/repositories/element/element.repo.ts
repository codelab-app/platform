import {
  ElementOGM,
  elementSelectionSet,
  getDescendantsCypher,
  getElementGraph,
} from '@codelab/backend/adapter/neo4j'
import { Element } from '@codelab/shared/abstract/codegen'
import { Node, RxTransaction, Transaction } from 'neo4j-driver'
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
   * Used for field resolver on element
   */
  getDescendants: async (
    txn: Transaction,
    rootId: string,
  ): Promise<Array<Element>> => {
    const ElementModel = await ElementOGM()
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = await txn.run(getDescendantsCypher, { rootId })

    const descendants = (
      await Promise.all(
        records[0].get(0).map((descendant: Node) => {
          const id = descendant.properties.id

          const element = ElementModel.find({
            where: { id },
            selectionSet: elementSelectionSet,
          })

          return element
        }),
      )
    ).flat()

    return descendants
  },
}
