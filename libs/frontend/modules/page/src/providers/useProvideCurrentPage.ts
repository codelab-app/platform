import { useEffect } from 'react'
import { usePageDispatch, usePageState } from '../hooks'
import { useGetPagesQuery } from '../store'
import { UseProvideCurrentPage } from './types'

export const useProvideCurrentPage = (
  pageId: string,
): UseProvideCurrentPage => {
  const { setCurrentPage } = usePageDispatch()
  const { currentPage } = usePageState()

  const { data, isLoading } = useGetPagesQuery(
    { variables: { where: { id: pageId } } },
    { skip: !pageId },
  )

  useEffect(() => {
    const loadedPage = data?.pages[0]

    if (loadedPage) {
      setCurrentPage({ currentPage: loadedPage })
    }
  }, [isLoading])

  return { currentPage }
}
