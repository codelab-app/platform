import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import type { App } from './app.model'

@model('codelab/AppModalService')
export class AppModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<App>>>(ModalService),
  props: {},
})) {
  @computed
  get app() {
    return this.metadata?.current ?? null
  }
}
