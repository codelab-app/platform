import type { IUserRepository } from '@codelab/frontend/abstract/domain'
import type { IUserDto } from '@codelab/shared/abstract/core'

import { userServerActions } from '@codelab/shared-domain-module/user'

const { DeleteUsers, GetUsers } = userServerActions()

export const userRepository: IUserRepository = {
  add: async (user: IUserDto) => {
    throw new Error('Not implemented')
  },
  delete: async (users) => {
    const {
      deleteUsers: { nodesDeleted },
    } = await DeleteUsers({
      where: { id_IN: users.map(({ id }) => id) },
    })

    return nodesDeleted
  },
  find: async (where) => {
    return await GetUsers({ where })
  },
  findOne: async (where) => {
    return (await userRepository.find(where)).items[0]
  },
  update: async () => {
    throw new Error('Not implemented')
  },
}
