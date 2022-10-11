import {
  Repository,
  tagDescendants,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { Element } from '@codelab/shared/abstract/codegen'
import { Node, Transaction } from 'neo4j-driver'

export const tagRepository = {
  /**
   * Used for field resolver on element
   */
  getDescendants: async (
    txn: Transaction,
    rootId: string,
  ): Promise<Array<Element>> => {
    const Tag = await Repository.instance.Tag
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = await txn.run(tagDescendants, { rootId })

    const descendants = (
      await Promise.all(
        records[0]?.get(0).map(async (descendant: Node) => {
          const id = descendant.properties.id

          const tag = await Tag.find({
            where: { id },
            selectionSet: tagSelectionSet,
          })

          return tag
        }),
      )
    ).flat()

    return descendants
  },
}
