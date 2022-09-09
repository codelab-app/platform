import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { IAppService } from '@codelab/shared/abstract/core'
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
