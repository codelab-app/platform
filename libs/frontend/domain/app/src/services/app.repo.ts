import type { IAppModel, IAppRepository } from '@codelab/frontend/abstract/core'
import { RepositoryService } from '@codelab/frontend/domain/shared'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import type {
  AppFragment,
  AppOptions,
  AppUniqueWhere,
  AppWhere,
} from '@codelab/shared/abstract/codegen'
import { ExtendedModel, Model, model, modelClass } from 'mobx-keystone'
import { App, appApi } from '../store'

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

  // @cachedWithTTL('apps')
  async find(where?: AppWhere, options?: AppOptions) {
    return await appApi.GetApps({ options, where })
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

  async findOne(where: AppUniqueWhere): Promise<AppFragment | undefined> {
    return (await this.find(where)).items[0]
  }
}
