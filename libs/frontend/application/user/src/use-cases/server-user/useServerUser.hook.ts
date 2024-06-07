import 'server-only'
import { getSession } from '@auth0/nextjs-auth0'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared/domain'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import { redirect } from 'next/navigation'

export const useServerUser = async () => {
  const session = await auth0ServerInstance.getSession()
  const user = session?.user

  if (user) {
    return redirect('/')
  }

  return mapAuth0IdTokenToUserDto(user)
}
