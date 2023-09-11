import type { ITag } from '@codelab/frontend/abstract/core'
import { ITagsTreeDataNode } from '@codelab/frontend/abstract/core'
import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
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

const create = ({ children, descendants, id, isRoot, name }: ITagDTO) => {
  return new Tag({
    children: children?.map((child) => tagRef(child.id)),
    descendants: descendants?.map((descendant) => tagRef(descendant.id)),
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
  writeCache({ children, descendants, isRoot, name }: Partial<ITagDTO>) {
    this.name = name ?? this.name
    this.children = children?.map((child) => tagRef(child.id)) ?? this.children
    this.descendants =
      descendants?.map((descendant) => tagRef(descendant.id)) ??
      this.descendants
    this.isRoot = isRoot ?? this.isRoot

    return this
  }

  @computed
  get antdNode(): ITagsTreeDataNode {
    return {
      children: this.children.map((child) => child.current.antdNode),
      extraData: {
        node: this,
        type: 'tag',
      },
      key: this.id,
      primaryTitle: this.name,
      title: this.name,
    }
  }

  toCreateInput(): TagCreateInput {
    return {
      id: this.id,
      name: this.name,
      parent: connectNodeId(this.parent?.current.id),
    }
  }

  toUpdateInput(): TagUpdateInput {
    return {
      name: this.name,
      parent: reconnectNodeId(this.parent?.current.id),
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
