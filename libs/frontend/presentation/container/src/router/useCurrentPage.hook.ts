import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const { pageDomainService } = useDomainStore()
  const { pageId } = useUrlPathParams()

  return useMemo(() => {
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      throw new Error('Page not found')
    }

    return page
  }, [pageId, pageDomainService.pages])
}
