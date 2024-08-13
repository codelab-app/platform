import { useUrl } from '@codelab/frontend-application-shared-store/router'

export const useResourceQuery = () => {
  const { resourceId } = useUrl()

  // TODO: use slugs instead
  return resourceId
}
