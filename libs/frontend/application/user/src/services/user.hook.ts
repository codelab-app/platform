'use client'

import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared/domain'
import { assertIsDefined } from '@codelab/shared/utils'

export const useUser = () => {
  const { user } = useAuth0User()

  assertIsDefined(user)

  return {
    auth0Id: user.sub,
    username: user.nickname,
  }
}
