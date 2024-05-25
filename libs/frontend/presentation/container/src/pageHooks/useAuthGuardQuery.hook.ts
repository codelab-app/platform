import isArray from 'lodash/isArray'
import { useRouter } from 'next/router'

export const useAuthGuardQuery = () => {
  const { query } = useRouter()

  return isArray(query.authGuardId) ? query.authGuardId[0] : undefined
}
