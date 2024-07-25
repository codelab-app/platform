'use client'

import type { IUserModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'

export const useUser = (): IUserModel => {
  const { userDomainService } = useDomainStore()

  return userDomainService.user
}
