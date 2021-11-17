import { useEffect } from 'react'
import { usePageDispatch, usePageState } from '../hooks'
import { useGetPageQuery } from '../store'
import { UseProvideCurrentPage } from './types'

export const useProvideCurrentPage = (
  pageId: string,
): UseProvideCurrentPage => {
  const { setCurrentPage } = usePageDispatch()
  const { currentPage } = usePageState()

  const { data, isLoading } = useGetPageQuery(
    { variables: { input: { pageId } } },
    { skip: !pageId },
  )

  useEffect(() => {
    if (data?.page) {
      setCurrentPage({ currentPage: data?.page })
    }
  }, [isLoading])

  return { currentPage }
}
