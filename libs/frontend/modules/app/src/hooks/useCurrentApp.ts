import { useAsyncState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { AppStore } from '../store'
import { useCurrentAppId } from './useCurrentAppId'

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
