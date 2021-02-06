import { useRouter } from 'next/router'
import { useGetPagesQuery } from '@codelab/generated'

/**
 * Get `appId` & `pageId` from query
 */
export const useAppQuery = () => {
  const { query } = useRouter()

  const appId = `${query.appId}`
  const pageId = `${query.pageId}`

  if (!appId && !pageId) {
    throw new Error('Missing appId & pageId from router')
  }

  const { data, loading } = useGetPagesQuery({
    variables: {
      input: {
        appId,
      },
    },
  })

  const pages = data?.getPages ?? []

  return {
    loading,
    pages,
    appId,
    pageId,
  }
}
