'use client'

import type { IUserModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend-application-shared-store/provider'

export const useUser = (): IUserModel => {
  const { userDomainService } = useStore()

  return userDomainService.user
}
