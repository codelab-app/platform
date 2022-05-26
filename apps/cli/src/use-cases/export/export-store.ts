import { StoreOGM, storeSelectionSet } from '@codelab/backend'

export const exportStore = async () => {
  const Store = await StoreOGM()

  const stores = await Store.find({
    selectionSet: storeSelectionSet,
  })
}
