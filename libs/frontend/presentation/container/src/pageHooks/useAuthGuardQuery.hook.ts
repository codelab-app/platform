import { useUrl } from '@codelab/frontend-application-shared-store/router'
import isArray from 'lodash/isArray'
import { useParams, useRouter } from 'next/navigation'

export const useAuthGuardQuery = () => {
  const { query } = useRouter()

  return authGuardId
}
