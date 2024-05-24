import {
  getAppService,
  type IAdminService,
} from '@codelab/frontend/abstract/application'
import { restWebClient } from '@codelab/frontend-application-axios'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
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
    return yield* _await(restWebClient.post('/admin/export', data))
  })

  @modelFlow
  importApp = _async(function* (this: AdminService, appDataFile: File) {
    const formData = new FormData()

    formData.append('file', appDataFile)

    return yield* _await(
      restWebClient
        .post<App>('/app/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          return this.appService.loadAppsPreview({ id: data.id })
        }),
    )
  })

  @modelFlow
  importData = _async(function* (this: AdminService, data: ImportDto) {
    return yield* _await(restWebClient.post('/admin/import', data))
  })

  @modelFlow
  @transaction
  resetDatabase = _async(function* (this: AdminService) {
    return yield* _await(restWebClient.post('/admin/reset-database'))
  })

  @modelFlow
  @transaction
  resetDatabaseExceptUser = _async(function* (this: AdminService) {
    return yield* _await(
      restWebClient.post('/admin/reset-database-except-user'),
    )
  })

  @computed
  private get appService() {
    return getAppService(this)
  }
}
