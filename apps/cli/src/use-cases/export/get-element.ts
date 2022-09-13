import {
  ElementOGM,
  elementSelectionSet,
  withReadTransactionResolver,
} from '@codelab/backend/adapter/neo4j'
import { elementDescendants } from '@codelab/backend/graphql'

export const getElementAndDescendants = async (rootId: string) => {
  const { id, descendants } = await withReadTransactionResolver(
    elementDescendants,
  )(
    {
      id: rootId,
    },
    {},
    null,
    {} as any,
  )

  const elementIds = [id, ...descendants]
  const Elements = await ElementOGM()

  return await Elements.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
