import type { IUserOutputDto } from '@codelab/backend/abstract/core'
import {
  getAppService,
  type IAdminService,
} from '@codelab/frontend/abstract/core'
import { restPlatformClient } from '@codelab/frontend/config'
import { ModalService } from '@codelab/frontend/shared/utils'
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

@model('@codelab/AdminService')
export class AdminService
  extends Model({
    exportDataModal: prop(() => new ModalService({})),
    importDataModal: prop(() => new ModalService({})),
  })
  implements IAdminService
{
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    return yield* _await(restPlatformClient.post('/admin/reset'))
  })

  @modelFlow
  exportData = _async(function* (this: AdminService, data: ExportDto) {
    return yield* _await(restPlatformClient.post('/admin/export', data))
  })

  @modelFlow
  importData = _async(function* (this: AdminService, data: ImportDto) {
    return yield* _await(restPlatformClient.post('/admin/import', data))
  })

  @computed
  private get appService() {
    return getAppService(this)
  }

  @modelFlow
  importApp = _async(function* (this: AdminService, appData: string) {
    return yield* _await(
      restPlatformClient
        .post<IUserOutputDto>('/import/app', appData)
        .then(({ data }) => {
          const appId = data.apps[0]?.app.id

          return this.appService.loadAppsPreview({ id: appId })
        }),
    )
  })
}
