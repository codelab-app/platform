import { IStoreExport } from '@codelab/shared/abstract/core'
import { createStore } from '../../repository/store.repo'

export const importStore = async (
  stores: Array<IStoreExport> = [],
  userId: string,
) => {
  console.log('Importing store...')

  for (const store of stores) {
    const importedStore = await createStore(store, userId)

    console.info(`Imported store with id ${importedStore.id}`)
  }
}
