import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'

/**
 * Get from `[pageName]` in url query
 */
export const usePageQuery = () => {
  const params = useParams()
  const pageSlug = params.pageSlug as string

  return { pageName: getNameFromSlug(pageSlug), pageSlug }
}
