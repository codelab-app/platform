import type { IAdminService } from '@codelab/frontend/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { adminApi } from './admin.api'

@model('@codelab/AdminService')
export class AdminService extends Model({}) implements IAdminService {
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    const { resetDatabase } = yield* _await(adminApi.ResetDatabase())

    return resetDatabase?.success
  })

  @modelFlow
  export = _async(function* (this: AdminService) {
    return yield* _await(fetch(`/api/export/admin`))
  })

  @modelFlow
  import = _async(function* (this: AdminService) {
    return yield* _await(fetch(`/api/import/admin`))
  })
}
