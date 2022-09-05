import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ExecuteCommandModalService')
export class ExecuteCommandModalService
  extends ExtendedModel(modelClass<ModalService<any>>(ModalService), {})
  implements IModalService {}
