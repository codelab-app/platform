import type {
  IAuthGuardModel,
  IAuthGuardRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardOptions,
  AuthGuardUniqueWhere,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  CreateAuthGuards,
  DeleteAuthGuards,
  GetAuthGuards,
  UpdateAuthGuard,
} from './auth-guard.api.graphql.gen'

export const authGuardRepository: IAuthGuardRepository = {
  add: async (authGuard: IAuthGuardModel) => {
    const {
      createAuthGuards: { authGuards },
    } = await CreateAuthGuards({
      input: [authGuard.toCreateInput()],
    })

    const createdAuthGuard = authGuards[0]

    assertIsDefined(createdAuthGuard)

    return createdAuthGuard
  },

  delete: async (authGuards: Array<IAuthGuardModel>) => {
    const {
      deleteAuthGuards: { nodesDeleted },
    } = await DeleteAuthGuards({
      delete: { config: { where: {} } },
      where: { id_IN: authGuards.map((authGuard) => authGuard.id) },
    })

    return nodesDeleted
  },

  find: async (where?: AuthGuardWhere, options?: AuthGuardOptions) => {
    return await GetAuthGuards({ options, where })
  },

  findOne: async (where: AuthGuardUniqueWhere) => {
    return (await authGuardRepository.find(where)).items[0]
  },

  selectOptions: async () => {
    const { items: authGuards } = await authGuardRepository.find({})

    return authGuards.map((authGuard) => ({
      label: authGuard.name,
      value: authGuard.id,
    }))
  },

  update: async (authGuard: IAuthGuardModel) => {
    const {
      updateAuthGuards: { authGuards },
    } = await UpdateAuthGuard({
      update: authGuard.toUpdateInput(),
      where: { id: authGuard.id },
    })

    const updatedAuthGuard = authGuards[0]

    assertIsDefined(updatedAuthGuard)

    return updatedAuthGuard
  },
}
