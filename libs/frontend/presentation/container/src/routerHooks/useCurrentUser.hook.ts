import { useUser } from '@auth0/nextjs-auth0/client'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared/domain'

export const useCurrentUser = () => {
  const { isLoading, user } = useUser()

  return mapAuth0IdTokenToUserDto(user.user)
}
