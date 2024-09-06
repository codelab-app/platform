import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'

export const useAuthGuardQuery = () => {
  const { authGuardId } = useUrlPathParams()

  return authGuardId
}
