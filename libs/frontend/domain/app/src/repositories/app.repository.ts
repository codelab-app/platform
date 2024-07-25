import type {
  IAppModel,
  IAppRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  AppOptions,
  AppUniqueWhere,
  AppWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { App } from '../store'
import { appApi } from './app.api'

export const appRepository: IAppRepository = {
  add: async (app: IAppModel) => {
    console.log(app.toCreateInput())

    const {
      createApps: { apps },
    } = await appApi.CreateApps({
      input: [app.toCreateInput()],
    })

    const createdApp = apps[0]

    assertIsDefined(createdApp)

    return createdApp
  },

  delete: async (apps: Array<IAppModel>) => {
    const {
      deleteApps: { nodesDeleted },
    } = await appApi.DeleteApps({
      delete: App.toDeleteInput(),
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  },

  find: async (where?: AppWhere, options?: AppOptions) => {
    return await appApi.AppList({
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
    } = await appApi.UpdateApps({
      update: app.toUpdateInput(),
      where: { id: app.id },
    })

    const updatedApp = apps[0]

    assertIsDefined(updatedApp)

    return updatedApp
  },
}
