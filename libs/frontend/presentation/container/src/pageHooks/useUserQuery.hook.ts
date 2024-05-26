import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'

export const useUserQuery = () => {
  const params = useParams()
  const userSlug = params.userSlug as string

  return {
    userName: getNameFromSlug(userSlug),
    userSlug,
  }
}
