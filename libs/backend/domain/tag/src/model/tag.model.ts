import type {
  ITag,
  ITagPreview,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Tag implements ITag {
  declare id: string

  declare name: string

  owner: IUserRef

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
