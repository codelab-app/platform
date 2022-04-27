import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { IStoreService } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useCurrentStore = (stores: IStoreService) => {
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
