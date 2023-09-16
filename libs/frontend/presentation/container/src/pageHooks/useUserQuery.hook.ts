import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

export const useUserQuery = () => {
  const { query } = useRouter()
  const userSlug = query.userSlug as string

  if (!userSlug) {
    throw new Error('Missing userSlug')
  }

  return {
    userName: getNameFromSlug(userSlug),
    userSlug,
  }
}
