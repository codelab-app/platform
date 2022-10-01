import { ModalService } from '@codelab/frontend/shared/utils'
import { IEntityModalService, IStore } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/StoreModalService')
export class StoreModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IStore>>>(ModalService), {})
  implements IEntityModalService<Ref<IStore>, { store: Maybe<IStore> }>
{
  @computed
  get store() {
    return this.metadata?.current
  }
}
