import { elementDescendants } from '@codelab/backend/graphql'
import {
  elementSelectionSet,
  Repository,
  withReadTransaction,
} from '@codelab/backend/infra/adapter/neo4j'

export const getElementAndDescendants = async (rootId: string) => {
  const descendants = await withReadTransaction(
    elementDescendants({
      id: rootId,
    }),
  )

  const elementIds = [rootId, ...descendants.map((element) => element.id)]
  const Element = await Repository.instance.Element

  return await Element.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
