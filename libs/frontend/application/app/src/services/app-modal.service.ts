import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/application/shared/store'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AppModalService')
export class AppModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAppModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAppModel>, { app?: IAppModel }>
{
  @computed
  get app() {
    return this.metadata?.current
  }
}
