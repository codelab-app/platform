import type { IRef } from '@codelab/shared/abstract/core'
import type { Node } from 'neo4j-driver'
import { getDescendantsCypher } from '../../cypher'
import type { Neo4jService, OgmService } from '../../infra'
import { elementSelectionSet } from '../../selectionSet'

export const getElementWithDescendants = async (
  neo4jService: Neo4jService,
  ogmService: OgmService,
  parent: IRef,
) => {
  const descendantIds: Array<string> = await neo4jService.withReadTransaction(
    async (txn) => {
      const { records } = await txn.run(getDescendantsCypher, {
        rootId: parent.id,
      })

      return (
        records[0]
          ?.get(0)
          .map((descendant: Node) => descendant.properties.id) ?? []
      )
    },
  )

  const elements = await ogmService.Element.find({
    selectionSet: `{ ${elementSelectionSet} }`,
    where: { id_IN: [parent.id, ...descendantIds] },
  })

  return elements
}
