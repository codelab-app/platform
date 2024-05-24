import type {
  ITagDomainService,
  ITagModel,
} from '@codelab/frontend/abstract/domain'
import type { ITagDto } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Tag } from './store'

@model('@codelab/TagDomainService')
export class TagDomainService
  extends Model({
    expandedNodes: prop<Array<string>>(() => []).withSetter(),
    selectedTag: prop<Nullable<Ref<ITagModel>>>(null).withSetter(),
    tags: prop(() => objectMap<ITagModel>()),
  })
  implements ITagDomainService
{
  @computed
  get selectedOption() {
    if (!this.selectedTag) {
      return null
    }

    return {
      label: this.selectedTag.current.name,
      value: this.selectedTag.current.id,
    }
  }

  @computed
  get tagsList() {
    return Array.from(this.tags.values())
  }

  @computed
  get tagsSelectOptions() {
    return this.tagsList.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }))
  }

  @modelAction
  hydrate = (tagDto: ITagDto) => {
    let tag = this.tags.get(tagDto.id)

    if (tag) {
      tag.writeCache(tagDto)
    } else {
      tag = Tag.create(tagDto)
    }

    this.tags.set(tag.id, tag)

    return tag
  }

  tag(id: string) {
    return this.tags.get(id)
  }
}
