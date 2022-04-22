import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Page } from './page.model'

@model('@codelab/PageModalService')
export class PageModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Page>>>(ModalService),
  props: {},
})) {
  @computed
  get page() {
    return this.metadata?.current ?? null
  }
}
