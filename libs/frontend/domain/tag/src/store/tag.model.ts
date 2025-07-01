import type {
  ITagModel,
  ITagNodeData,
  ITreeNode,
  IUserModel,
} from '@codelab/frontend-abstract-domain'
import type { ITagDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import { userRef } from '@codelab/frontend-abstract-domain'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({
  children,
  descendants,
  id,
  name,
  owner,
  parent,
}: ITagDto) => {
  return new Tag({
    children: children?.map((child) => tagRef(child.id)),
    descendants: descendants?.map((descendant) => tagRef(descendant.id)),
    id,
    name,
    owner: userRef(owner.id),
    parent: parent ? tagRef(parent.id) : undefined,
  })
}

@model('@codelab/Tag')
export class Tag
  extends Model({
    children: prop<Array<Ref<ITagModel>>>(() => []),
    descendants: prop<Array<Ref<ITagModel>>>(() => []),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUserModel>>(),
    parent: prop<Ref<ITagModel> | undefined>(undefined),
  })
  implements ITagModel
{
  static create = create

  @computed
  get isRoot() {
    return !this.parent
  }

  @computed
  get label() {
    return this.name
  }

  @computed
  get toJson() {
    return {
      children: this.children.map((child) => child.current.toJson),
      descendants: this.descendants.map(
        (descendant) => descendant.current.toJson,
      ),
      id: this.id,
      name: this.name,
      owner: this.owner.current.toJson,
      parent: this.parent?.current.toJson,
    }
  }

  @computed
  get treeNode(): ITreeNode<ITagNodeData> {
    return {
      children: this.children.map((child) => child.current.treeNode),
      extraData: {
        node: this,
        type: 'tag',
      },
      key: this.id,
      primaryTitle: this.name,
      title: this.name,
    }
  }

  @modelAction
  writeCache({ children, descendants, name, parent }: Partial<ITagDto>) {
    this.name = name ?? this.name
    this.children = children?.map((child) => tagRef(child.id)) ?? this.children
    this.descendants =
      descendants?.map((descendant) => tagRef(descendant.id)) ??
      this.descendants
    this.parent = parent ? tagRef(parent.id) : undefined

    return this
  }
}

export const tagRef = rootRef<ITagModel>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
