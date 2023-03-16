import type { IAppService } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useAsync } from '@react-hookz/web'

export const useCurrentApp = (appService: IAppService) => {
  const appId = useCurrentAppId()

  return useAsync(() => appService.getOne(appId))
}
