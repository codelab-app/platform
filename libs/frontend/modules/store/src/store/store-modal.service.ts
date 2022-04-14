import { ModalService } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Store } from './store.model'

@model('@codelab/StoreModalService')
export class StoreModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Maybe<Ref<Store>>>>(ModalService),
  props: {},
})) {
  @computed
  get store() {
    return this.metadata?.current ?? null
  }
}
