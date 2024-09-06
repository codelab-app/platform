import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'

export const useAppQuery = () => {
  const { appId } = useUrlPathParams()

  return {
    appId,
  }
}
