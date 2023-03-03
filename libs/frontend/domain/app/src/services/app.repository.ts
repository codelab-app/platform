import type { IApp, IAppRepository } from '@codelab/frontend/abstract/core'
import { deleteStoreInput } from '@codelab/frontend/domain/store'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import { createUniqueName } from '@codelab/shared/utils'
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
  update = _async(function* (this: AppRepository, { name, id }: IApp) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { _compoundName: createUniqueName(name, { id }) },
        where: { id },
      }),
    )

    return apps[0]!
  })

  @modelFlow
  find = _async(function* (this: AppRepository, where: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    return apps
  })

  @modelFlow
  delete = _async(function* (this: AppRepository, ids: Array<string>) {
    const {
      deleteApps: { nodesDeleted },
    } = yield* _await(
      appApi.DeleteApps({
        delete: {
          pages: [
            {
              delete: {},
              where: {},
            },
          ],
          store: {
            delete: deleteStoreInput,
            where: {},
          },
        },
        where: { id_IN: ids },
      }),
    )

    return nodesDeleted
  })
}
