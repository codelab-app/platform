import type { IAppRepository } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { App } from '@codelab/frontend-domain-app/store'
import type {
  AppOptions,
  AppUniqueWhere,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { appApi } from '../graphql/app.api'

export class AppRepository implements IAppRepository {
  async add(app: IAppModel) {
    const {
      createApps: { apps },
    } = await appApi.CreateApps({
      input: [app.toCreateInput()],
    })

    const createdApp = apps[0]

    assertIsDefined(createdApp)

    return createdApp
  }

  /**
   * We only want to load the _app page to constructor the URL from the app list item to navigate to
   */
  async appsList(where?: AppWhere, options?: AppOptions) {
    return await appApi.GetAppsList({
      options,
      where,
    })
  }

  async delete(apps: Array<IAppModel>) {
    const {
      deleteApps: { nodesDeleted },
    } = await appApi.DeleteApps({
      delete: App.toDeleteInput(),
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  }

  async find(where?: AppWhere, options?: AppOptions) {
    return await appApi.GetApps({ options, where })
  }

  async findOne(where: AppUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  async update(app: IAppModel) {
    const {
      updateApps: { apps },
    } = await appApi.UpdateApps({
      update: app.toUpdateInput(),
      where: { id: app.id },
    })

    const updatedApp = apps[0]

    assertIsDefined(updatedApp)

    return updatedApp
  }
}

let appRepository: IAppRepository | undefined

export const getAppRepository = () => (appRepository ??= new AppRepository())
