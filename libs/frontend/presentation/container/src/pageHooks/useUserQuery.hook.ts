import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useUserQuery = () => {
  const { userSlug } = useUrl()

  return {
    userName: getNameFromSlug(userSlug),
    userSlug,
  }
}
