import {
  ElementOGM,
  elementSelectionSet,
  withReadTransaction,
} from '@codelab/backend/adapter/neo4j'
import { elementDescendants } from '@codelab/backend/graphql'

export const getElementAndDescendants = async (rootId: string) => {
  const descendants = await withReadTransaction(
    elementDescendants({
      id: rootId,
    }),
  )

  const elementIds = [rootId, ...descendants.map((element) => element.id)]
  const Elements = await ElementOGM()

  return await Elements.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
