import isArray from 'lodash/isArray'
import { useRouter } from 'next/router'

export const useResourceQuery = () => {
  const { query } = useRouter()

  // TODO: use slugs instead
  return isArray(query.resourceId) ? query.resourceId[0] : undefined
}
