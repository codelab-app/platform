import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/StoreModalService')
export class StoreModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IStoreModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IStoreModel>, { store?: IStoreModel }>
{
  @computed
  get store() {
    return this.data?.current
  }
}
