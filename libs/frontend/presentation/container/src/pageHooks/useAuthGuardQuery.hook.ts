import { useUrl } from '@codelab/frontend-application-shared-store/router'

export const useAuthGuardQuery = () => {
  const { authGuardId } = useUrl()

  return authGuardId
}
