import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { StoreService } from '../store'

export const useCurrentStore = (stores: StoreService) => {
  const storeId = useCurrentStoreId()

  const [getStore, { isLoading, error }] = useLoadingState((id: string) =>
    stores.getOne(id),
  )

  useEffect(() => {
    if (storeId) {
      getStore(storeId)
    }
  }, [storeId, getStore])

  return { store: storeId ? stores.store(storeId) : null, isLoading, error }
}
