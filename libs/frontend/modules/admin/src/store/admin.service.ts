import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IAdminService,
  IExecuteCommandDTO,
} from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { adminApi } from './admin.api'

@model('@codelab/AdminService')
export class AdminService
  extends Model({
    executeCommandModal: prop(() => new ModalService({})),
  })
  implements IAdminService
{
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    const { resetDatabase } = yield* _await(adminApi.ResetDatabase())

    return resetDatabase?.success
  })

  @modelFlow
  @transaction
  executeCommand = _async(function* (
    this: AdminService,
    data: IExecuteCommandDTO,
  ) {
    const { executeCommand } = yield* _await(
      adminApi.ExecuteCommand({
        input: data,
      }),
    )

    return executeCommand
  })
}
