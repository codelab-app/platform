import { Resource } from '@codelab/frontend/modules/resource'
import { ModalService } from '@codelab/frontend/shared/utils'
import { Maybe } from 'graphql/jsutils/Maybe'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/StoreResourceModalService')
export class StoreResourceModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Maybe<Ref<Resource>>>>(ModalService),
  props: {},
})) {
  @computed
  get resource() {
    return this.metadata?.current ?? null
  }
}
