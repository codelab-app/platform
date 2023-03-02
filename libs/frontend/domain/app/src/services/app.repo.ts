import type { IApp } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { appApi } from '../store'

@model('@codelab/AppRepository')
export class AppRepository extends Model({}) {
  @modelFlow
  add = _async(function* (this: AppRepository, app: IApp) {
    const {
      createApps: { apps },
    } = yield* _await(
      appApi.CreateApps({
        input: [app.toCreateInput()],
      }),
    )
  })
}
