import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useAsyncState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { AppStore } from '../store'

export const useCurrentApp = (apps: AppStore) => {
  const appId = useCurrentAppId()

  const [getApp, { isLoading, error }] = useAsyncState((id: string) =>
    apps.getOne(id),
  )

  useEffect(() => {
    if (appId) {
      getApp(appId)
    }
  }, [appId, getApp])

  return { app: appId ? apps.app(appId) : null, isLoading, error }
}
