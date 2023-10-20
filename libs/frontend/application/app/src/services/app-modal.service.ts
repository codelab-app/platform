import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AppModalService')
export class AppModalService
  extends ExtendedModel(modelClass<ModalService<IAppModel>>(ModalService), {})
  implements IEntityModalService<IAppModel, { app?: IAppModel }>
{
  @computed
  get app() {
    return this.metadata
  }
}
