import { ITag, ITagDTO } from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

const hydrate = (tag: ITagDTO) => {
  return new Tag({
    id: tag.id,
    name: tag.name,
    isRoot: tag.isRoot ?? false,
    children: tag.children?.map((child) => tagRef(child.id)),
    descendants: tag.descendants?.map((descendant) => tagRef(descendant.id)),
  })
}

@model('@codelab/Tag')
export class Tag
  extends Model({
    id: idProp,
    name: prop<string>(),
    isRoot: prop<boolean>(),
    children: prop<Array<Ref<ITag>>>(() => []),
    descendants: prop<Array<Ref<ITag>>>(() => []),
  })
  implements ITag
{
  @computed
  get label() {
    return this.name
  }

  static hydrate = hydrate

  @modelAction
  writeCache(tag: ITagDTO): ITag {
    this.name = tag.name
    this.children = tag.children?.map((child) => tagRef(child.id)) ?? []
    this.descendants =
      tag.descendants?.map((descendant) => tagRef(descendant.id)) ?? []
    this.isRoot = tag.isRoot ?? false

    return this
  }

  @computed
  get antdNode() {
    return {
      key: this.id,
      title: this.name,
      children: this.children.map((child) => child.current.antdNode),
    }
  }
}

export const tagRef = rootRef<ITag>('@codelab/TagRef', {
  onResolvedValueChange(ref, newTag, oldTag) {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
