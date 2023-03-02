import type { IEntity } from '@codelab/shared/abstract/types'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { GraphQLRequestContext } from 'apollo-server-types'
import type { Node, Transaction } from 'neo4j-driver'
import { getDescendantsCypher } from '../../../cypher'
import { Repository, withReadTransaction } from '../../../infra'
import { elementSelectionSet } from '../../../selectionSet'

export const descendantElementsFieldResolver: IFieldResolver<
  IEntity,
  unknown
> = (parent) =>
  withReadTransaction(async (txn) => {
    const Element = await Repository.instance.Element

    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records } = await txn.run(getDescendantsCypher, {
      rootId: parent.id,
    })

    const descendants = (
      await Promise.all(
        records[0]?.get(0).map((descendant: Node) => {
          const id = descendant.properties.id

          const element = Element.find({
            where: { id },
            selectionSet: elementSelectionSet,
          })

          return element
        }),
      )
    ).flat()

    return descendants
  })
