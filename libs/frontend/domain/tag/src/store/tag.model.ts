import type { ITag, ITagDTO } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({ id, name, isRoot, children, descendants }: ITagDTO) => {
  return new Tag({
    children: children.map((child) => tagRef(child.id)),
    descendants: descendants.map((descendant) => tagRef(descendant.id)),
    id,
    isRoot,
    name,
  })
}

@model('@codelab/Tag')
export class Tag
  extends Model({
    children: prop<Array<Ref<ITag>>>(() => []),
    descendants: prop<Array<Ref<ITag>>>(() => []),
    id: idProp,
    isRoot: prop<boolean>(false),
    name: prop<string>(),
    parent: prop<Nullable<Ref<ITag>>>(null),
  })
  implements ITag
{
  @computed
  get label() {
    return this.name
  }

  static create = create

  @modelAction
  writeCache({
    id,
    name,
    isRoot,
    descendants,
    parent,
    children,
  }: Partial<ITagDTO>) {
    this.name = name ?? this.name
    this.children = children?.map((child) => tagRef(child.id)) ?? this.children
    this.descendants =
      descendants?.map((descendant) => tagRef(descendant.id)) ??
      this.descendants
    this.isRoot = isRoot ?? this.isRoot

    return this
  }

  @computed
  get antdNode() {
    return {
      children: this.children.map((child) => child.current.antdNode),
      key: this.id,
      title: this.name,
    }
  }
}

export const tagRef = rootRef<ITag>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
