import { useAsyncState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { PageStore } from '../store'

export const usePage = (pageId: string, pages: PageStore) => {
  const [getPage, { isLoading, error }] = useAsyncState((id: string) =>
    pages.getOne(id),
  )

  useEffect(() => {
    if (pageId) {
      getPage(pageId)
    }
  }, [pageId, getPage])

  return { page: pageId ? pages.page(pageId) : null, isLoading, error }
}
