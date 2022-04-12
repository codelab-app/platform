import { isArray } from 'lodash'
import { useRouter } from 'next/router'

export const useCurrentResourceId = () => {
  const { query } = useRouter()

  return isArray(query.resourceId) ? query.resourceId[0] : undefined
}
