import {
  Repository,
  storeSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportStore = async () => {
  const Store = await Repository.instance.Store

  const stores = await Store.find({
    selectionSet: storeSelectionSet,
  })

  return { stores }
}
