import { useAsyncState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { StateStore } from '../store'

export const useGetCurrentStore = (storeId: string, stateStore: StateStore) => {
  const [getStore, { isLoading, error }] = useAsyncState((id: string) =>
    stateStore.getOne(id),
  )

  useEffect(() => {
    if (storeId) {
      getStore(storeId)
    }
  }, [storeId, getStore])

  return { store: storeId ? stateStore.store(storeId) : null, isLoading, error }
}
