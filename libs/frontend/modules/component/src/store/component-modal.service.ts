import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Component } from './component.model'

@model('codelab/ComponentModalService')
export class ComponentModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Component>>>(ModalService),
  props: {},
})) {
  @computed
  get component() {
    return this.metadata?.current ?? null
  }
}
