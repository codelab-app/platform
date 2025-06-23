import type { IAuthGuardDto, IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared-infra-gqlgen'

import { type IAuthGuardRepository } from '@codelab/frontend-abstract-domain'
import {
  authGuardApi,
  authGuardMapper,
  authGuardServerActions,
} from '@codelab/shared-domain-module-auth-guard'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateAuthGuards, DeleteAuthGuards, GetAuthGuards, UpdateAuthGuard } =
  authGuardServerActions

export const authGuardRepository: IAuthGuardRepository = {
  add: async (input: IAuthGuardDto, next?: NextFetchOptions) => {
    const {
      createAuthGuards: { authGuards },
    } = await CreateAuthGuards(
      { input: authGuardMapper.toCreateInput(input) },
      next,
    )

    const createdAuthGuard = authGuards[0]

    Validator.assertsDefined(createdAuthGuard)

    return createdAuthGuard
  },

  delete: async (refs: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteAuthGuards: { nodesDeleted },
    } = await DeleteAuthGuards(
      {
        delete: authGuardMapper.toDeleteInput(),
        where: { id_IN: refs.map(({ id }) => id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: AuthGuardWhere,
    options?: AuthGuardOptions,
    next?: NextFetchOptions,
  ) => {
    return await GetAuthGuards({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: AuthGuardWhere, next?: NextFetchOptions) => {
    return (await authGuardRepository.find(where, {}, next)).items[0]
  },

  selectOptions: async (next?: NextFetchOptions) => {
    const { items: authGuards } = await authGuardApi().GetAuthGuards({})

    return authGuards.map((authGuard) => ({
      label: authGuard.name,
      value: authGuard.id,
    }))
  },

  update: async (
    { id }: IRef,
    input: IAuthGuardDto,
    next?: NextFetchOptions,
  ) => {
    const {
      updateAuthGuards: { authGuards },
    } = await UpdateAuthGuard(
      {
        update: authGuardMapper.toUpdateInput(input),
        where: { id },
      },
      next,
    )

    const updatedAuthGuard = authGuards[0]

    Validator.assertsDefined(updatedAuthGuard)

    return updatedAuthGuard
  },
}
