import {
  exportElementSelectionSet,
  getDescendantsCypher,
  Repository,
  withReadTransaction,
} from '@codelab/backend/infra/adapter/neo4j'
import type { Node } from 'neo4j-driver'

export const getElementWithDescendants = (rootId: string) =>
  withReadTransaction(async (txn) => {
    const Element = await Repository.instance.Element
    const { records } = await txn.run(getDescendantsCypher, { rootId })
    const descendants = records[0]?.get(0)

    const descendantIds = descendants.map(
      ({ properties }: Node) => properties.id,
    )

    return await Element.find({
      selectionSet: exportElementSelectionSet,
      where: { id_IN: [rootId, ...descendantIds] },
    })
  })
