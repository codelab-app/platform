import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useAppQuery = () => {
  const { appSlug, primarySidebarKey } = useUrl()

  return {
    appName: getNameFromSlug(appSlug),
    appSlug,
    primarySidebarKey,
  }
}
