import type { IOwner, ITag, ITagPreview } from '@codelab/backend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export class Tag implements ITag {
  declare id: string

  declare name: string

  owner: IOwner

  children: Array<ITagPreview>

  parent: ITagPreview | null

  constructor({ id, name, children = [], parent = null, owner }: ITag) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.owner = owner
  }
}

export const tagRef = rootRef<ITag>('@codelab/TagRef', {
  onResolvedValueChange: (ref, newTag, oldTag) => {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
