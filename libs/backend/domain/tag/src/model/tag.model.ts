import type {
  IAuth0Owner,
  ITag,
  ITagDTO,
} from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { detach, rootRef } from 'mobx-keystone'

export class Tag implements ITagDTO {
  declare id: string

  declare name: string

  owner: IAuth0Owner

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
