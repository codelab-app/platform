import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  AppOptions,
  AppUniqueWhere,
  AppWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'

import { App } from '../store'
import {
  AppList,
  CreateApps,
  DeleteApps,
  UpdateApps,
} from './app.api.graphql.gen'

export const appRepository: IAppRepository = {
  add: async (app: IAppModel) => {
    const {
      createApps: { apps },
    } = await CreateApps({
      input: [app.toCreateInput()],
    })

    const createdApp = apps[0]

    Validator.assertsDefined(createdApp)

    return createdApp
  },

  delete: async (apps: Array<IAppModel>) => {
    const {
      deleteApps: { nodesDeleted },
    } = await DeleteApps({
      delete: App.toDeleteInput(),
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  },

  find: async (where?: AppWhere, options?: AppOptions) => {
    return await AppList({
      options,
      where,
    })
  },

  findOne: async (where: AppUniqueWhere) => {
    return (await appRepository.find(where)).items[0]
  },

  update: async (app: IAppModel) => {
    const {
      updateApps: { apps },
    } = await UpdateApps({
      update: app.toUpdateInput(),
      where: { id: app.id },
    })

    const updatedApp = apps[0]

    Validator.assertsDefined(updatedApp)

    return updatedApp
  },
}
