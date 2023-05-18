import type { IApp, IAppRepository } from '@codelab/frontend/abstract/core'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import type { AppOptions, AppWhere } from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { appApi } from '../store'

@model('@codelab/AppRepository')
export class AppRepository extends Model({}) implements IAppRepository {
  add = async (app: IApp) => {
    const {
      createApps: { apps },
    } = await appApi.CreateApps({
      input: [app.toCreateInput()],
    })

    return apps[0]!
  }

  update = async (app: IApp) => {
    const {
      updateApps: { apps },
    } = await appApi.UpdateApps({
      update: app.toUpdateInput(),
      where: { id: app.id },
    })

    return apps[0]!
  }

  @cachedWithTTL('apps')
  find = async (where?: AppWhere, options?: AppOptions) => {
    return await appApi.GetApps({ options, where })
  }

  @clearCacheForKey('apps')
  delete = async (apps: Array<IApp>) => {
    const {
      deleteApps: { nodesDeleted },
    } = await appApi.DeleteApps({
      delete: apps[0]?.toDeleteInput(),
      where: { id_IN: apps.map((app) => app.id) },
    })

    return nodesDeleted
  }
}
