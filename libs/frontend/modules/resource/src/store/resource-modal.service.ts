
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Resource } from './resource.model'

@model('codelab/ResourceModalService')
export class ResourceModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Resource>>>(ModalService),
  props: {},
})) {
  @computed
  get resource() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/ResourcesModalService')
export class ResourcesModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Array<Ref<Resource>>>>(ModalService),
  props: {},
})) {
  @computed
  get resources() {
    return this.metadata?.map((a) => a.current) ?? []
  }
}
