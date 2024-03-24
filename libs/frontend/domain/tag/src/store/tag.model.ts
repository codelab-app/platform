import type { ITagModel, ITagNodeData } from '@codelab/frontend/abstract/domain'
import {
  getUserDomainService,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITagDto } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared/domain'
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

const create = ({ children, descendants, id, isRoot, name }: ITagDto) => {
  return new Tag({
    children: children?.map((child) => tagRef(child.id)),
    descendants: descendants?.map((descendant) => tagRef(descendant.id)),
    id,
    name,
  })
}

@model('@codelab/Tag')
export class Tag
  extends Model({
    children: prop<Array<Ref<ITagModel>>>(() => []),
    descendants: prop<Array<Ref<ITagModel>>>(() => []),
    id: idProp,
    name: prop<string>(),
    // Used to compute root only, not used for connections
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
      children: this.children,
      descendants: this.descendants,
      id: this.id,
      name: this.name,
      parent: this.parent,
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

  toCreateInput(): TagCreateInput {
    return {
      // children: connectNodeIds(this.children.map((tag) => tag.current.id)),
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userDomainService.user),
      parent: connectNodeId(this.parent?.current.id),
    }
  }

  toUpdateInput(): TagUpdateInput {
    return {
      // children: reconnectNodeIds(this.children.map((tag) => tag.current.id)),
      name: this.name,
      parent: reconnectNodeId(this.parent?.current.id),
    }
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}

export const tagRef = rootRef<ITagModel>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
