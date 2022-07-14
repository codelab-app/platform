import { useCurrentApp } from '@codelab/frontend/modules/app'
import { IAppService, IStoreService } from '@codelab/shared/abstract/core'

export const useCurrentStore = (
  appService: IAppService,
  storeService: IStoreService,
) => {
  const { app, isLoading, error } = useCurrentApp(appService)

  return {
    store: app ? storeService.store(app.store.id) : null,
    isLoading,
    error,
  }
}
