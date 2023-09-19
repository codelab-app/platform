import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

/**
 * Get from `[pageName]` in url query
 */
export const usePageQuery = () => {
  const { query } = useRouter()
  const pageSlug = query.pageSlug as string

  // if (!pageSlug) {
  //   throw new Error('Missing pageSlug')
  // }

  return { pageName: getNameFromSlug(pageSlug), pageSlug }
}
