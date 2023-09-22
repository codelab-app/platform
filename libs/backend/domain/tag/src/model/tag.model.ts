import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Tag implements ITagDTO {
  children: Array<IEntity>

  descendants: Array<IEntity>

  id: string

  name: string

  parent?: IEntity | null

  constructor({
    children = [],
    descendants = [],
    id,
    name,
    parent = null,
  }: ITagDTO) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.descendants = descendants
  }
}
