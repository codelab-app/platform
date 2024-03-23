import type {
  ITagDomainService,
  ITagModel,
} from '@codelab/frontend/abstract/domain'
import type { ITagDto } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Tag, tagRef } from './store'

@model('@codelab/TagDomainService')
export class TagDomainService
  extends Model({
    selectedTag: prop<Nullish<Ref<ITagModel>>>(null).withSetter(),
    tags: prop(() => objectMap<ITagModel>()),
  })
  implements ITagDomainService
{
  @computed
  get selectedOption() {
    return {
      label: this.selectedTag?.current.name ?? '',
      value: this.selectedTag?.current.id ?? '',
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
  hydrate = ({ children, descendants, id, isRoot, name, parent }: ITagDto) => {
    const tag = new Tag({
      children: children?.map((child) => tagRef(child.id)),
      descendants: descendants?.map((child) => tagRef(child.id)),
      id,
      name,
      parent: parent?.id ? tagRef(parent.id) : null,
    })

    console.log(tag.id)

    this.tags.set(tag.id, tag)

    return tag
  }

  tag(id: string) {
    return this.tags.get(id)
  }
}
