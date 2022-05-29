import { ResourceOGM, resourceSelectionSet } from '@codelab/backend'

export const exportResource = async () => {
  const Store = await ResourceOGM()

  const resources = await Store.find({
    selectionSet: resourceSelectionSet,
  })

  return { resources }
}
