import type { IRef } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppOptions,
  AppUniqueWhere,
  AppUpdateInput,
  AppWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IAppModel,
  type IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'
import { withTracingMethods } from '@codelab/shared-infra-sentry'

import { App } from '../store'
import {
  AppList,
  CreateApps,
  DeleteApps,
  UpdateApps,
} from './app.api.graphql.gen'

export const appRepository: IAppRepository = withTracingMethods('app', {
  add: async (input: AppCreateInput) => {
    const {
      createApps: { apps },
    } = await CreateApps({
      input,
    })

    const createdApp = apps[0]

    Validator.assertsDefined(createdApp)

    return createdApp
  },

  delete: async (apps: Array<IRef>, input: AppDeleteInput) => {
    const {
      deleteApps: { nodesDeleted },
    } = await DeleteApps({
      delete: input,
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  },

  find: async (where?: AppWhere, options?: AppOptions) => {
    return await AppList(
      {
        options,
        where,
      },
      { tags: [CACHE_TAGS.APP_LIST] },
    )
  },

  findOne: async (where: AppUniqueWhere) => {
    return (await appRepository.find(where)).items[0]
  },

  update: async ({
    update,
    where,
  }: {
    update: AppUpdateInput
    where: AppWhere
  }) => {
    const {
      updateApps: { apps },
    } = await UpdateApps({
      update,
      where,
    })

    const updatedApp = apps[0]

    Validator.assertsDefined(updatedApp)

    return updatedApp
  },
})
