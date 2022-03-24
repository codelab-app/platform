import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { StoreService } from '../store'

export const useGetCurrentStore = (
  storeId: string,
  storeService: StoreService,
) => {
  const [getStore, { isLoading, error }] = useLoadingState((id: string) =>
    storeService.getOne(id),
  )

  useEffect(() => {
    if (!storeId) {
      return
    }

    getStore(storeId)
  }, [storeId, getStore])

  return {
    store: storeId ? storeService.store(storeId) : null,
    isLoading,
    error,
  }
}
