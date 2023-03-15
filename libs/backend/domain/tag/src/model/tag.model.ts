import type { IOwner, ITag } from '@codelab/backend/abstract/core'
import type { ITagDTO } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { detach, rootRef } from 'mobx-keystone'

export class Tag implements ITagDTO {
  declare id: string

  declare name: string

  owner: IOwner

  children: Array<IEntity>

  parent?: IEntity | null

  descendants: Array<IEntity>

  constructor({
    children = [],
    descendants = [],
    id,
    name,
    owner,
    parent = null,
  }: ITagDTO) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.owner = owner
    this.descendants = descendants
  }
}

export const tagRef = rootRef<ITag>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
