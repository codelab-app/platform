import { useRouter } from 'next/router'

export const useCurrentPageId = () => {
  const { query } = useRouter()

  return query.pageId as string
}
