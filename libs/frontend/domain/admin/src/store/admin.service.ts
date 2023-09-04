import type { IUserOutputDto } from '@codelab/backend/abstract/core'
import {
  getAppService,
  type IAdminService,
} from '@codelab/frontend/abstract/core'
import { httpClient } from '@codelab/frontend/config'
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'

@model('@codelab/AdminService')
export class AdminService
  extends Model({
    exportDataModal: prop(() => new ModalService({})),
  })
  implements IAdminService
{
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    return yield* _await(httpClient.post('/admin/reset'))
  })

  @modelFlow
  exportData = _async(function* (this: AdminService) {
    return yield* _await(httpClient.post('/admin/export'))
  })

  @modelFlow
  importData = _async(function* (this: AdminService) {
    return yield* _await(httpClient.post('/admin/import'))
  })

  @computed
  private get appService() {
    return getAppService(this)
  }

  @modelFlow
  importApp = _async(function* (this: AdminService, appData: string) {
    return yield* _await(
      httpClient
        .post<IUserOutputDto>('/import/app', appData)
        .then(({ data }) => {
          const appId = data.apps[0]?.app.id

          return this.appService.loadAppsWithNestedPreviews({ id: appId })
        }),
    )
  })
}
