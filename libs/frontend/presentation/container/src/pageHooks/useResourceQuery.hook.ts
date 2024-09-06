import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'

export const useResourceQuery = () => {
  const { resourceId } = useUrlPathParams()

  // TODO: use slugs instead
  return resourceId
}
