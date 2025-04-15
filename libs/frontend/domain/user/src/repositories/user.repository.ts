import type { IUserRepository } from '@codelab/frontend-abstract-domain'
import type { IUserDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type { UserWhere } from '@codelab/shared-infra-gqlgen'

import { userServerActions } from '@codelab/shared-domain-module-user'

const { DeleteUsers, GetUsers } = userServerActions

export const userRepository: IUserRepository = {
  add: async (user: IUserDto, next?: NextFetchOptions) => {
    throw new Error('Not implemented')
  },
  delete: async (users, next?: NextFetchOptions) => {
    const {
      deleteUsers: { nodesDeleted },
    } = await DeleteUsers(
      {
        where: { id_IN: users.map(({ id }) => id) },
      },
      next,
    )

    return nodesDeleted
  },
  find: async (where?: UserWhere, options?, next?: NextFetchOptions) => {
    return await GetUsers({ where }, next)
  },
  findOne: async (where: UserWhere, next?: NextFetchOptions) => {
    return (await userRepository.find(where, undefined, next)).items[0]
  },
  update: async (ref, user, next?: NextFetchOptions) => {
    throw new Error('Not implemented')
  },
}
