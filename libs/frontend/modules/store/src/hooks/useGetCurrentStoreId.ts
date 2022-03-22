import { useRouter } from 'next/router'

export const useCurrentStoreId = () => {
  const { query } = useRouter()

  return query.storeId as string
}
