import type { Tag } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { Node } from 'neo4j-driver'
import { tagDescendants } from '../../../../cypher'
import { Repository, withReadTransaction } from '../../../../infra'
import { tagSelectionSet } from '../../../../selectionSet'

export const descendants: IFieldResolver<Tag, unknown> = (parent) =>
  withReadTransaction(async (txn) => {
    const Tag = await Repository.instance.Tag
    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = await txn.run(tagDescendants, { rootId: parent.id })

    return (
      await Promise.all(
        records[0]?.get(0).map(async (descendant: Node) => {
          const id = descendant.properties.id

          const tag = await Tag.find({
            selectionSet: tagSelectionSet,
            where: { id },
          })

          return tag
        }),
      )
    ).flat()
  })
