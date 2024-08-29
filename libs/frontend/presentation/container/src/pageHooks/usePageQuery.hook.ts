import { useUrl } from '@codelab/frontend-application-shared-store/router'

/**
 * Get from `[pageName]` in url query
 */
export const usePageQuery = () => {
  const { pageId } = useUrl()

  return { pageId }
}
