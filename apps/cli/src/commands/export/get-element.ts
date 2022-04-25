import { elementGraph, ElementOGM, elementSelectionSet } from '@codelab/backend'

export const getElementAndDescendants = async (rootId: string) => {
  const { id, descendants } = await elementGraph(
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
