import type { IAppRepository } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { App } from '@codelab/frontend/domain/app'
import type {
  AppOptions,
  AppUniqueWhere,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { appApi } from '../graphql/app.api'

@model('@codelab/AppRepository')
export class AppRepository extends Model({}) implements IAppRepository {
  async add(app: IAppModel) {
    const {
      createApps: { apps },
    } = await appApi.CreateApps({
      input: [app.toCreateInput()],
    })

    return apps[0]!
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

  // @clearCacheForKey('apps')
  async delete(apps: Array<IAppModel>) {
    const {
      deleteApps: { nodesDeleted },
    } = await appApi.DeleteApps({
      delete: App.toDeleteInput(),
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  }

  // @cachedWithTTL('apps')
  async find(where?: AppWhere, options?: AppOptions) {
    return await appApi.GetApps({ options, where })
  }

  async findOne(where: AppUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  // @clearCacheForKey('apps')
  async update(app: IAppModel) {
    const {
      updateApps: { apps },
    } = await appApi.UpdateApps({
      update: app.toUpdateInput(),
      where: { id: app.id },
    })

    return apps[0]!
  }
}
