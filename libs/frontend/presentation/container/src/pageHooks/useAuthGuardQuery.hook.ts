import isArray from 'lodash/isArray'
import { useParams, useRouter } from 'next/navigation'

export const useAuthGuardQuery = () => {
  const { query } = useRouter()

  return isArray(params.authGuardId) ? params.authGuardId[0] : undefined
}
