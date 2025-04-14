import type { IAppDto, IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import type { AppOptions, AppWhere } from '@codelab/shared/infra/gqlgen'

import { type IAppRepository } from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import { appMapper, appServerActions } from '@codelab/shared-domain-module/app'

const { AppList, AppListPreview, CreateApps, DeleteApps, UpdateApps } =
  appServerActions

export const appRepository: IAppRepository = {
  add: async (input: IAppDto, next?: NextFetchOptions) => {
    const {
      createApps: { apps },
    } = await CreateApps(
      {
        input: appMapper.toCreateInput(input),
      },
      next,
    )

    const createdApp = apps[0]

    Validator.assertsDefined(createdApp)

    return createdApp
  },

  delete: async (refs: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteApps: { nodesDeleted },
    } = await DeleteApps(
      {
        delete: appMapper.toDeleteInput(),
        where: {
          id_IN: refs.map(({ id }) => id),
        },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: AppWhere,
    options?: AppOptions,
    next?: NextFetchOptions,
  ) => {
    return await AppList(
      {
        options,
        where,
      },
      next,
    )
  },

  // FIXME: make a unique where
  findOne: async (where: AppWhere, next?: NextFetchOptions) => {
    return (await appRepository.find(where, {}, next)).items[0]
  },

  findPreview: async (
    where?: AppWhere,
    options?: AppOptions,
    next?: NextFetchOptions,
  ) => {
    return await AppListPreview(
      {
        options,
        where,
      },
      next,
    )
  },

  update: async ({ id }: IRef, input: IAppDto, next?: NextFetchOptions) => {
    const {
      updateApps: { apps },
    } = await UpdateApps(
      { update: appMapper.toUpdateInput(input), where: { id } },
      next,
    )

    const updatedApp = apps[0]

    Validator.assertsDefined(updatedApp)

    return updatedApp
  },
}
