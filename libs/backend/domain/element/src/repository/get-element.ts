import {
  elementSelectionSet,
  Repository,
  withReadTransaction,
} from '@codelab/backend/infra/adapter/neo4j'
import { elementRepository } from './element.neo4j.repo'

export const getElementAndDescendants = async (rootId: string) => {
  const descendants = await withReadTransaction((txn) =>
    elementRepository.getDescendants(txn, rootId),
  )

  const elementIds = [rootId, ...descendants.map((element) => element.id)]
  const Element = await Repository.instance.Element

  return await Element.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
