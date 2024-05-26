import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'

/**
 * Get from `[pageName]` in url query
 */
export const usePageQuery = () => {
  const { pageSlug } = useUrl()

  return { pageName: getNameFromSlug(pageSlug), pageSlug }
}
