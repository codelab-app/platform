import { getUserService } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { ITagsTreeDataNode } from '@codelab/frontend/abstract/domain'
import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
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
    children: prop<Array<Ref<ITagModel>>>(() => []),
    descendants: prop<Array<Ref<ITagModel>>>(() => []),
    id: idProp,
    isRoot: prop<boolean>(false),
    name: prop<string>(),
    parent: prop<Nullable<Ref<ITagModel>>>(null),
  })
  implements ITagModel
{
  static create = create

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
      isRoot: this.isRoot,
      name: this.name,
      parent: this.parent,
    }
  }

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

  toCreateInput(): TagCreateInput {
    return {
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
      parent: connectNodeId(this.parent?.current.id),
    }
  }

  toUpdateInput(): TagUpdateInput {
    return {
      name: this.name,
      parent: reconnectNodeId(this.parent?.current.id),
    }
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}

export const tagRef = rootRef<ITagModel>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
