import type { IAuthGuardDto, IRef } from '@codelab/shared/abstract/core'
import type {
  AuthGuardOptions,
  AuthGuardUniqueWhere,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IAuthGuardRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'

import {
  CreateAuthGuards,
  DeleteAuthGuards,
  GetAuthGuards,
  UpdateAuthGuard,
} from './auth-guard.api.graphql.gen'
import { authGuardMapper } from './auth-guard.mapper'

export const authGuardRepository: IAuthGuardRepository = {
  add: async (input: IAuthGuardDto) => {
    const {
      createAuthGuards: { authGuards },
    } = await CreateAuthGuards(
      { input: authGuardMapper.toCreateInput(input) },
      { revalidateTag: CACHE_TAGS.AUTH_GUARD_LIST },
    )

    const createdAuthGuard = authGuards[0]

    Validator.assertsDefined(createdAuthGuard)

    return createdAuthGuard
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteAuthGuards: { nodesDeleted },
    } = await DeleteAuthGuards(
      {
        delete: authGuardMapper.toDeleteInput(),
        where: { id_IN: refs.map(({ id }) => id) },
      },
      { revalidateTag: CACHE_TAGS.AUTH_GUARD_LIST },
    )

    return nodesDeleted
  },

  find: async (where?: AuthGuardWhere, options?: AuthGuardOptions) => {
    return await GetAuthGuards(
      { options, where },
      { tags: [CACHE_TAGS.AUTH_GUARD_LIST] },
    )
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

  update: async ({ id }: IRef, input: IAuthGuardDto) => {
    const {
      updateAuthGuards: { authGuards },
    } = await UpdateAuthGuard(
      {
        update: authGuardMapper.toUpdateInput(input),
        where: { id },
      },
      { revalidateTag: CACHE_TAGS.AUTH_GUARD_LIST },
    )

    const updatedAuthGuard = authGuards[0]

    Validator.assertsDefined(updatedAuthGuard)

    return updatedAuthGuard
  },
}
