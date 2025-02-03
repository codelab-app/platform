'use server'

import type {  IUserSession } from '@codelab/shared/abstract/core'

import { mapClaimsToUserDto } from '@codelab/shared-domain-module/user'
import { withAsyncSpanFunc } from '@codelab/shared-infra-sentry'
import { redirect } from 'next/navigation'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { Nullable } from '@codelab/shared/abstract/types'

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
      // return redirect('/auth/login')
    }
    return mapClaimsToUserDto(user)
  },
)

export const getMaybeServerUser = async (): Promise<Nullable<IUserDto>> => {
  const session = await auth0Instance.getSession()
  const user = session?.user

  if (!user) {
    return null
  }

  return mapClaimsToUserDto(user)
}
