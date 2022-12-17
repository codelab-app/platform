import type {
  IEntityModalService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

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
