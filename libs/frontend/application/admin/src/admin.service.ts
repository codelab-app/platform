import {
  getAppService,
  type IAdminService,
} from '@codelab/frontend/abstract/application'
import { restPlatformClient } from '@codelab/frontend/application/axios'
import { ModalService } from '@codelab/frontend/application/shared/store'
import type { App } from '@codelab/shared/abstract/codegen'
import type { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
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

interface ImportAppResponse {
  apps: Array<{ app: App }>
}

@model('@codelab/AdminService')
export class AdminService
  extends Model({
    exportDataModal: prop(() => new ModalService({})),
    importDataModal: prop(() => new ModalService({})),
  })
  implements IAdminService
{
  @modelFlow
  exportData = _async(function* (this: AdminService, data: ExportDto) {
    return yield* _await(restPlatformClient.post('/admin/export', data))
  })

  @modelFlow
  importApp = _async(function* (this: AdminService, appData: string) {
    return yield* _await(
      restPlatformClient
        .post<ImportAppResponse>('/import/app', appData)
        .then(({ data }) => {
          const appId = data.apps[0]?.app.id

          return this.appService.loadAppsPreview({ id: appId })
        }),
    )
  })

  @modelFlow
  importData = _async(function* (this: AdminService, data: ImportDto) {
    return yield* _await(restPlatformClient.post('/admin/import', data))
  })

  @modelFlow
  @transaction
  resetDatabase = _async(function* (this: AdminService) {
    return yield* _await(restPlatformClient.post('/admin/reset-database'))
  })

  @modelFlow
  @transaction
  resetDatabaseExceptUser = _async(function* (this: AdminService) {
    return yield* _await(
      restPlatformClient.post('/admin/reset-database-except-user'),
    )
  })

  @modelFlow
  @transaction
  resetDatabaseExceptUserAndAtom = _async(function* (this: AdminService) {
    return yield* _await(
      restPlatformClient.post('/admin/reset-database-except-user-and-atom'),
    )
  })

  @computed
  private get appService() {
    return getAppService(this)
  }
}
