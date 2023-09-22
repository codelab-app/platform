import type {
  IEntityModalService,
  IStoreModel,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/StoreModalService')
export class StoreModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IStoreModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IStoreModel>, { store: Maybe<IStoreModel> }>
{
  @computed
  get store() {
    return this.metadata?.current
  }
}
