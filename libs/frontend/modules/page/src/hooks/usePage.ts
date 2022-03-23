import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { PageService } from '../store'

export const usePage = (pageId: string, pages: PageService) => {
  const [getPage, { isLoading, error }] = useLoadingState((id: string) =>
    pages.getOne(id),
  )

  useEffect(() => {
    if (pageId) {
      getPage(pageId)
    }
  }, [pageId, getPage])

  return { page: pageId ? pages.page(pageId) : null, isLoading, error }
}
