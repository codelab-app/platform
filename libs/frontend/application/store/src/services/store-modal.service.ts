import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/StoreModalService')
export class StoreModalService
  extends ExtendedModel(modelClass<ModalService<IStoreModel>>(ModalService), {})
  implements IEntityModalService<IStoreModel, { store?: IStoreModel }>
{
  @computed
  get store() {
    return this.metadata
  }
}
