import type { IAppService } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useAsync } from 'react-use'

export const useCurrentApp = (appService: IAppService) => {
  const appId = useCurrentAppId()

  const { loading, value, error } = useAsync(
    (id: string) => appService.getOne(id),
    [appId],
  )

  return {
    app: value,
    loading: loading,
    error,
  }
}
