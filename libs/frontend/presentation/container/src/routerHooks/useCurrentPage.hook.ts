import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const { pageDomainService } = useDomainStore()
  const { pageId } = useUrl()

  return useMemo(() => {
    const page = pageDomainService.pagesList.find(({ id }) => id === pageId)

    return page
  }, [pageId, pageDomainService.pagesList])
}
