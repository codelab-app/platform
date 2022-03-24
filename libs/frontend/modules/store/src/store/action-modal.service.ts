import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Action } from './action.model'

@model('codelab/ActionModalService')
export class ActionModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Action>>>(ModalService),
  props: {},
})) {
  @computed
  get action() {
    return this.metadata?.current ?? null
  }
}
