import { isArray } from 'lodash'
import { useRouter } from 'next/router'

export const useCurrentStoreId = () => {
  const { query } = useRouter()

  return isArray(query.storeId) ? query.storeId[0] : undefined
}
