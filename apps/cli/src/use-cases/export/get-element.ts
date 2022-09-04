import {
  ElementOGM,
  elementSelectionSet,
  withRxWriteTransaction,
} from '@codelab/backend/adapter/neo4j'
import { elementGraph } from '@codelab/backend/graphql'

export const getElementAndDescendants = async (rootId: string) => {
  const { id, descendants } = await withRxWriteTransaction(elementGraph)(
    null,
    { input: { rootId } },
    null,
    null as any,
  )

  const elementIds = [id, ...descendants]
  const Elements = await ElementOGM()

  return await Elements.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
