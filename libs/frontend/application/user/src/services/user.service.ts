import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/infra/gqlgen'

import { userRepository } from '@codelab/frontend-domain-user/repositories'
import { useCallback } from 'react'

export const useUserService = () => {
  const getOne = useCallback(async (where: UserWhere) => {
    const { items } = await userRepository.find(where)

    return items[0]
  }, [])

  const saveUser = useCallback(async (data: Auth0IdToken) => {
    return Promise.resolve(undefined)
    // return restWebClient.post('/user/save', data)
  }, [])

  return {
    getOne,
    saveUser,
  }
}
