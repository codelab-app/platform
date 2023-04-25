import isArray from 'lodash/isArray'
import { useRouter } from 'next/router'

export const useCurrentStoreId = () => {
  const { query } = useRouter()

  return isArray(query.storeId) ? query.storeId[0] : undefined
}
