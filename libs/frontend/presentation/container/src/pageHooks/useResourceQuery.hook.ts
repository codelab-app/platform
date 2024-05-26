import isArray from 'lodash/isArray'
import { useParams, useRouter } from 'next/navigation'

export const useResourceQuery = () => {
  const { query } = useRouter()

  // TODO: use slugs instead
  return isArray(query.resourceId) ? query.resourceId[0] : undefined
}
