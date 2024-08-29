import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useAppQuery = () => {
  const { appId, primarySidebarKey } = useUrl()

  return {
    appId,
    appName: getNameFromSlug(appId),
    primarySidebarKey,
  }
}
