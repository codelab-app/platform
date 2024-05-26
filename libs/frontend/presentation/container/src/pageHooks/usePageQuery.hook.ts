import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

/**
 * Get from `[pageName]` in url query
 */
export const usePageQuery = () => {
  const { pageSlug } = useUrl()

  return { pageName: getNameFromSlug(pageSlug), pageSlug }
}
