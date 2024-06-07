import 'server-only'
import { getSession } from '@auth0/nextjs-auth0'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared/domain'
import { redirect } from 'next/navigation'

export const useServerUser = async () => {
  const session = await getSession()
  const user = session?.user

  if (user) {
    return redirect('/apps')
  }

  return mapAuth0IdTokenToUserDto(user)
}
