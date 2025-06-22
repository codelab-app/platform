'use client'

import type { IUserModel } from '@codelab/frontend-abstract-domain'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'

export const useUser = (): IUserModel => {
  const { userDomainService } = useDomainStore()

  return userDomainService.user
}
