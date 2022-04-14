import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Tag } from './tag.model'

@model('@codelab/TagModalService')
export class TagModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Tag>>>(ModalService),
  props: {},
})) {
  @computed
  get tag() {
    return this.metadata?.current ?? null
  }
}

@model('@codelab/TagsModalService')
export class TagsModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Array<Ref<Tag>>>>(ModalService),
  props: {},
})) {
  @computed
  get tags() {
    return this.metadata?.map((tag) => tag.current) ?? []
  }
}
