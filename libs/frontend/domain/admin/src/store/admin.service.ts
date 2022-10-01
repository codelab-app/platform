import { IAdminService } from '@codelab/shared/abstract/core'
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
}
