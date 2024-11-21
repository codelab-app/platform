import type { IAppDto, IRef } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppOptions,
  AppUniqueWhere,
  AppUpdateInput,
  AppWhere,
  CreateAppsMutationVariables,
  DeleteAppTypesMutationVariables,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IAppModel,
  type IAppRepository,
} from '@codelab/frontend/abstract/domain'
import { appMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'
import {
  AppList,
  AppListPreview,
  CreateApps,
  DeleteApps,
  UpdateApps,
} from '@codelab/shared-domain-module-app'
import { withTracingMethods } from '@codelab/shared-infra-sentry'

import { App } from '../store'

export const appRepository: IAppRepository = withTracingMethods('app', {
  add: async (input: IAppDto) => {
    const {
      createApps: { apps },
    } = await CreateApps({
      input: appMapper.toCreateInput(input),
    })

    const createdApp = apps[0]

    Validator.assertsDefined(createdApp)

    return createdApp
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteApps: { nodesDeleted },
    } = await DeleteApps({
      delete: appMapper.toDeleteInput(),
      where: {
        id_IN: refs.map(({ id }) => id),
      },
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

  findPreview: async (where?: AppWhere, options?: AppOptions) => {
    return await AppListPreview(
      {
        options,
        where,
      },
      { tags: [CACHE_TAGS.APP_LIST] },
    )
  },

  update: async ({ id }: IRef, input: IAppDto) => {
    const {
      updateApps: { apps },
    } = await UpdateApps(
      { update: appMapper.toUpdateInput(input), where: { id } },
      { revalidateTag: CACHE_TAGS.APP_LIST },
    )

    const updatedApp = apps[0]

    Validator.assertsDefined(updatedApp)

    return updatedApp
  },
})
