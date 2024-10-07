'use server'

import type { IUserDto } from '@codelab/shared/abstract/core'

import { mapClaimsToUserDto } from '@codelab/shared/domain'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import { withAsyncSpanFunc } from '@codelab/shared-infra-sentry'
import { redirect } from 'next/navigation'

export const getServerUser = withAsyncSpanFunc(
  {
    name: 'getServerUser',
    op: 'codelab.auth0',
  },
  async (): Promise<IUserDto> => {
    const session = await auth0ServerInstance.getSession()
    const user = session?.user

    if (!user) {
      return redirect('/')
      // return redirect('/api/auth/login')
    }

    return mapClaimsToUserDto(user)
  },
)

export const getMaybeServerUser = async () => {
  const session = await auth0ServerInstance.getSession()
  const user = session?.user

  if (!user) {
    return null
  }

  return mapClaimsToUserDto(user)
}
