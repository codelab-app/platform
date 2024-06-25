import 'server-only'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { mapClaimsToUserDto } from '@codelab/shared/domain'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import { redirect } from 'next/navigation'

export const getServerUser = async (): Promise<IUserDto> => {
  const session = await auth0ServerInstance.getSession()
  const user = session?.user

  if (!user) {
    return redirect('/')
  }

  return mapClaimsToUserDto(user)
}
