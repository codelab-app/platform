import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { IAppService } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useCurrentApp = (apps: IAppService) => {
  const appId = useCurrentAppId()

  const [getApp, { isLoading, error }] = useLoadingState((id: string) =>
    apps.getOne(id),
  )

  useEffect(() => {
    if (appId) {
      getApp(appId)
    }
  }, [appId, getApp])

  return { app: appId ? apps.app(appId) : null, isLoading, error }
}
