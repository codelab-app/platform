import {
  ElementOGM,
  elementSelectionSet,
  getDescendantsCypher,
} from '@codelab/backend/adapter/neo4j'
import { Element } from '@codelab/shared/abstract/codegen'
import { Node, Transaction } from 'neo4j-driver'

export const elementRepository = {
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
