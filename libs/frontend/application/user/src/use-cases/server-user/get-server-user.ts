'use server'

import type { IUserSession } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

import { mapClaimsToUserDto } from '@codelab/shared-domain-module/user'
import { auth0Instance } from '@codelab/shared-infra-auth0'
import { redirect } from 'next/navigation'

export const getServerUser = async (): Promise<IUserSession> => {
  const session = await auth0Instance.getSession()
  const user = session?.user

  if (!user) {
    return redirect('/')
    // return redirect('/auth/login')
  }

  return mapClaimsToUserDto(user)
}

export const getMaybeServerUser = async (): Promise<Nullable<IUserSession>> => {
  const session = await auth0Instance.getSession()
  const user = session?.user

  if (!user) {
    return null
  }

  return mapClaimsToUserDto(user)
}
