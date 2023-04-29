import type { IApp, IAppRepository } from '@codelab/frontend/abstract/core'
import type { AppOptions, AppWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { appApi } from '../store'

@model('@codelab/AppRepository')
export class AppRepository extends Model({}) implements IAppRepository {
  @modelFlow
  add = _async(function* (this: AppRepository, app: IApp) {
    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input: [app.toCreateInput()],
      }),
    )

    return apps[0]!
  })

  @modelFlow
  update = _async(function* (this: AppRepository, app: IApp) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: app.toUpdateInput(),
        where: { id: app.id },
      }),
    )

    return apps[0]!
  })

  @modelFlow
  find = _async(function* (
    this: AppRepository,
    where?: AppWhere,
    options?: AppOptions,
  ) {
    return yield* _await(appApi.GetApps({ options, where }))
  })

  @modelFlow
  delete = _async(function* (this: AppRepository, apps: Array<IApp>) {
    const {
      deleteApps: { nodesDeleted },
    } = yield* _await(
      appApi.DeleteApps({
        delete: apps[0]?.toDeleteInput(),
        where: { id_IN: apps.map((app) => app.id) },
      }),
    )

    return nodesDeleted
  })
}
