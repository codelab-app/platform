import { useUrl } from '@codelab/frontend-application-shared-store/router'

export const useAppQuery = () => {
  const { appId, primarySidebarKey } = useUrl()

  return {
    appId,
    primarySidebarKey,
  }
}
