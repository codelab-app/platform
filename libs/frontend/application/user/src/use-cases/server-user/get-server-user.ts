'use server'

import type {  IUserSession } from '@codelab/shared/abstract/core'

import { mapClaimsToUserDto } from '@codelab/shared-domain-module/user'
import { withAsyncSpanFunc } from '@codelab/shared-infra-sentry'
import { redirect } from 'next/navigation'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'

export const getServerUser = withAsyncSpanFunc(
  {
    name: 'getServerUser',
    op: 'codelab.auth0',
  },
  async (): Promise<IUserSession> => {
    const session = await auth0Instance.getSession()
    const user = session?.user

    if (!user) {
      return redirect('/')
      // return redirect('/api/auth/login')
    }

    return mapClaimsToUserDto(user)
  },
)

export const getMaybeServerUser = async () => {
  const session = await auth0Instance.getSession()
  const user = session?.user

  if (!user) {
    return null
  }

  return mapClaimsToUserDto(user)
}
