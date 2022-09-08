import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IAppService } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useCurrentApp = (appService: IAppService) => {
  const appId = useCurrentAppId()

  const [getApp, { isLoading, error, isDone }] = useStatefulExecutor(
    (id: string) => appService.getOne(id),
  )

  useEffect(() => {
    if (appId) {
      getApp(appId)
    }
  }, [appId, getApp])

  return {
    app: appId && isDone ? appService.app(appId) : null,
    isLoading,
    error,
  }
}
