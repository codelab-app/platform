import type {
  IAppModel,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AppModalService')
export class AppModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAppModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAppModel>, { app: Maybe<IAppModel> }>
{
  @computed
  get app() {
    return this.metadata?.current
  }
}
