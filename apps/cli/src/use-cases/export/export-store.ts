import { StoreOGM, storeSelectionSet } from '@codelab/backend/adapter/neo4j'

export const exportStore = async () => {
  const Store = await StoreOGM()

  const stores = await Store.find({
    selectionSet: storeSelectionSet,
  })

  return { stores }
}
