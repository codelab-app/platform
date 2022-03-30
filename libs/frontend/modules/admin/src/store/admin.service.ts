import { ImportAdminDataInput } from '@codelab/shared/abstract/codegen-v2'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { adminApi } from './admin.api'

export interface WithAdminService {
  adminService: AdminService
}

@model('codelab/AdminService')
export class AdminService extends Model({}) {
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    const { resetDatabase } = yield* _await(adminApi.ResetData())

    return resetDatabase?.success
  })

  @modelFlow
  @transaction
  exportData = _async(function* (this: AdminService) {
    const { exportAdminData } = yield* _await(adminApi.ExportData())

    return exportAdminData.result
  })

  @modelFlow
  @transaction
  importData = _async(function* (
    this: AdminService,
    data: ImportAdminDataInput,
  ) {
    const { importAdminData } = yield* _await(
      adminApi.ImportData({ input: data }),
    )

    return importAdminData?.result
  })
}
